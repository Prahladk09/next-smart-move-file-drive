import '../utils/cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'nsm_files', // optional: a folder inside Cloudinary
      resource_type: 'auto',
    };
  },
});

export const upload = multer({ storage });
