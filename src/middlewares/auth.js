import jwt from 'jsonwebtoken';
import CustomError from '../utils/customError.js';
import Staff from '../models/staff.js';
import Permission from '../models/permission.js';

export const checkToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new CustomError('Token required', 401);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Staff.findById(decoded.id);
        if (!req.user) throw new CustomError('User not found', 404);

        next();
    } catch (err) {
        next(err);
    }
};

export const checkPermission = (model, action) => async (req, res, next) => {
    try {
        if (req.user.role === 'superadmin') return next();

        const permission = await Permission.findOne({
            adminId: req.user._id,
            permissionModel: model,
            actions: { $in: [action] },
        });

        if (!permission) throw new CustomError('Permission denied', 403);
        next();
    } catch (err) {
        next(err);
    }
};

export const isSuperAdmin = (req, res, next) => {
    if (req.user.role !== 'superadmin') throw new CustomError('SuperAdmin access required', 403);
    next();
};

export const isAdminOrSuper = (req, res, next) => {
    if (!['admin', 'superadmin'].includes(req.user.role)) throw new CustomError('Admin or SuperAdmin required', 403);
    next();
};