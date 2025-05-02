import express from 'express';
import { uploadFile } from '../controllers/fileController';
import { upload } from '../utils/multer';
import { subscribeUploadProgress } from '../sse/uploadProgress';


const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);
router.get('/stream-progress', subscribeUploadProgress);

export default router;
