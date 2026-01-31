import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Staff from '../models/staff.js';
import CustomError from '../utils/customError.js';
import { registerSchema, loginSchema } from '../validators/authValidator.js';

export const register = async (req, res, next) => {
try {

  const { error } = registerSchema.validate(req.body);
  if (error) throw new CustomError(error.details[0].message, 400);
  
    const existingStaff = await Staff.findOne({ username: req.body.username });
  if (existingStaff) throw new CustomError('Username band', 400);

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;

  const newStaff = await Staff.create(req.body);
  const token = jwt.sign({ id: newStaff._id, role: newStaff.role }, process.env.JWT_SECRET, { expiresIn: '1d' });


  res.json({ 
    accessToken: token,
    staff: newStaff
  });

} catch (error) {
  next(error);
}

};

export const login = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) throw new CustomError(error.details[0].message, 400);

    const { username, password } = req.body;

    const staff = await Staff.findOne({ username });
    if (!staff) {
      throw new CustomError('Foydalanuvchi topilmadi', 401);
    }

    if (!bcrypt.compareSync(password, staff.password)) {
    throw new CustomError('Notogri parol', 401);
    }

    const token = jwt.sign({ id: staff._id, role: staff.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token });

  } catch (error) {
    next(error);
  }
};