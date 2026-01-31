import rolePermissions from "../utils/permission.js";
import CustomError from "../utils/customError.js";

const rolePermission = (roles) => {

    return (req, res, next) => {
        try {
            if (!rolePermissions[req.user.role].includes(req.method) || !roles.includes(req.user.role) || req.user.role !== 'superadmin') {
                throw new CustomError('Ruxsat yo‘q', 403);
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}

export default rolePermission;
