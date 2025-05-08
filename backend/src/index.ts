import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import folderRoutes from './routes/folderRoutes';
import fileRoutes from './routes/fileRoutes';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// for deployemnt
const _dirname = path.resolve();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/folders', folderRoutes);
app.use('/api/files', fileRoutes);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(_dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, "../frontend", "dist", "index.html"));
  });
}

// Connect DB and start server
mongoose.connect(process.env.MONGODB_URI as string).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
