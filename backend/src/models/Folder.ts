import { Schema, model, Types } from 'mongoose';

// This code defines a Mongoose schema and model for a folder structure.
// The schema includes fields for the folder name, parent folder reference,
const folderSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  parent: { type: Types.ObjectId, ref: 'Folder', default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model('Folder', folderSchema);
