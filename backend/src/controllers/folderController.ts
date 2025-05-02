import { Request, Response } from 'express';
import Folder from '../models/Folder';
import File from '../models/File';

export const createFolder = async (req: Request, res: Response) => {
  try {
    const { name, parent, description } = req.body;
    //case if folder with the same name already exists
    const existingFolder = await Folder.findOne({ name, parent });
    if (existingFolder) {
      res.status(400).json({ message: 'Folder with this name already exists' });
      return;
    }
    const newFolder = await Folder.create({ name, parent: parent || null, description: description || '', });
    res.status(201).json(newFolder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create folder', error });
  }
};

export const getFolderTree = async (req: Request, res: Response) => {
  try {
    const folders = await Folder.find().lean();
    const files = await File.find().lean();

    const buildTree = (parentId: string | null) : any[] => {
      return folders
        .filter((f) => String(f.parent) === String(parentId))
        .map((folder) => {
          const children = buildTree(String(folder._id));
          const folderFiles = files.filter((f) => String(f.folderId) === String(folder._id));
          return { ...folder, children, files: folderFiles };
        });
    };

    const folderTree = buildTree(null);

    // Add files with no folderId
    const rootFiles = files.filter((f) => !f.folderId);
    const rootNode = {
      _id: 'root',
      name: 'Root Files',
      description: 'Files not inside any folder',
      parent: null,
      children: [],
      files: rootFiles,
    };

    const response = rootFiles.length > 0 ? [rootNode, ...folderTree] : folderTree;

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get folder tree', error });
  }
};

export const getFolderContents = async (req: Request, res: Response) => {
  try {
    const folderId = req.params.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string || '').trim();

    const skip = (page - 1) * limit;

    const folderFilter: any = { parent: folderId };
    const fileFilter: any = { folderId };

    if (search) {
      folderFilter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];

      fileFilter.$or = [
        { originalName: { $regex: search, $options: 'i' } },
        { fileType: { $regex: search, $options: 'i' } },
      ];
    }

    const [folders, totalFolders] = await Promise.all([
      Folder.find(folderFilter).skip(skip).limit(limit).lean(),
      Folder.countDocuments(folderFilter),
    ]);

    const [files, totalFiles] = await Promise.all([
      File.find(fileFilter).skip(skip).limit(limit).lean(),
      File.countDocuments(fileFilter),
    ]);

    res.json({
      folders,
      files,
      totalFolders,
      totalFiles,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch filtered folder contents', error });
  }
};


