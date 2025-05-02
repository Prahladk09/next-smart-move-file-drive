import { Request, Response } from 'express';
import File from '../models/File';
import { emitProgress } from '../sse/uploadProgress';



export const uploadFile = async (req: Request, res: Response) => {
  try {
    const file = req.file as Express.Multer.File;
    const { folderId, clientId } = req.body;

    if (!file || !file.path){
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }
    // Simulate progress for UI
    for (let p = 10; p <= 100; p += 10) {
      emitProgress(clientId, p);
      await new Promise((r) => setTimeout(r, 100)); // simulate time
    }

     // new file entry
     const newFileData = {
      name: file.filename,
      originalName: file.originalname,
      fileType: file.mimetype,
      url: file.path,
    };

    // Only include folderId if provided
    if (folderId) {
      (newFileData as any).folderId = folderId;
    }

    const newFile = await File.create(newFileData);

    res.status(201).json(newFile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to upload file', error: err });
  }
};
