import express from 'express';
import {
  createFolder,
  getFolderTree,
  getFolderContents
} from '../controllers/folderController';

const router = express.Router();

router.post('/', createFolder);
router.get('/', getFolderTree);
router.get('/:id/items', getFolderContents);

export default router;
