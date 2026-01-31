import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: true,
    index: true
  },
  permissionModel: {
    type: String,
    required: true,
    trim: true
  },
  actions: [{
    type: String,
    enum: ['create', 'read', 'update', 'delete'],
    required: true
  }]
}, {
  timestamps: true,           
  strictPopulate: false       
});


export default mongoose.model('Permission', permissionSchema);