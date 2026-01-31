import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthdate: { type: Date, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  role: { type: String, enum: ['staff', 'admin', 'superadmin'], default: 'staff' },
});

export default mongoose.model('Staff', staffSchema);