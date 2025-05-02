import { Schema, model, Types } from 'mongoose';

const fileSchema = new Schema({
  name: { type: String, required: true },
  originalName: { type: String },
  folderId: { type: Types.ObjectId, ref: 'Folder', required: false  },
  fileType: { type: String },
  url: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model('File', fileSchema);
