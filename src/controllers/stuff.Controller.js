import Staff from '../models/staff.js';
import CustomError from '../utils/customError.js';


export const getStaffs = async (req, res) => {
  const staffs = await Staff.find().select('-password');
  if (!staffs) throw new CustomError('Foydalanuvchi topilmadi', 404);
  res.status(200).json(staffs);
};

export const getStaffInfo = async (req, res) => {
  const staff = await Staff.findById(req.params.id).select('-password');
  if (!staff) throw new CustomError('Foydalanuvchi topilmadi', 404);
  res.status(200).json(staff);
};

export const deleteStaff = async (req, res) => {
  const staff = await Staff.findByIdAndDelete(req.params.id);
  if (!staff) throw new CustomError('Foydalanuvchi topilmadi', 404);
  res.status(200).json({ success: true, message: 'Staff o`chirildi' });
};

export const changeStaff = async (req, res) => {
  const staff = await Staff.findByIdAndUpdate(
    req.params.id,
    req.body,
  ).select('-password');
  if (!staff) throw new CustomError('Foydalanuvchi topilmadi', 404);
  res.status(200).json({
    success: true,
    message: 'Staff yangilandi',
    data: staff
  });
};