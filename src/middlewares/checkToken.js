import jwt from 'jsonwebtoken';
import CustomError from '../utils/customError.js';
import Staff from '../models/staff.js';

const checkToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new CustomError('Token topilmadi', 401);
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      throw new CustomError('Token bolishi shart', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const staff = await Staff.findById(decoded.id);
    if (!staff) {
      throw new CustomError('Foydalanuvchi topilmadi', 404);
    }

    req.user = staff;
    next();

  } catch (error) {
    if (error == jwt.TokenExpiredError) {
      return next(new CustomError('Token muddati tugagan', 401));
    }
    if (error == jwt.JsonWebTokenError) {
      return next(new CustomError('Notogri token', 401));
    }

    return next(error);
  }
};

export default checkToken;