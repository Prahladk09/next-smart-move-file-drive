import express from 'express';
import { deleteFile, uploadFile } from '../controllers/fileController';
import { upload } from '../utils/multer';
import { subscribeUploadProgress } from '../sse/uploadProgress';


const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);
router.get('/stream-progress', subscribeUploadProgress);
router.delete('/:id', deleteFile);

export default router;
