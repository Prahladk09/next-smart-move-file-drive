import express from 'express';
import {
  createFolder,
  getFolderTree,
  getFolderContents,
  deleteFolder
} from '../controllers/folderController';

const router = express.Router();

router.post('/', createFolder);
router.get('/', getFolderTree);
router.get('/:id/items', getFolderContents);
router.delete('/:id', deleteFolder);

export default router;
