import express from 'express';
const router = express.Router();

import { getStaffs, getStaffInfo, deleteStaff, changeStaff } from '../controllers/stuff.Controller.js';
import checkToken from '../middlewares/checkToken.js';
import rolePermission from '../middlewares/rolePermission.js';

router.get('/api/staffs', checkToken, rolePermission(['admin','superadmin']), getStaffs);
router.get('/api/staff/:id', checkToken, rolePermission(['admin','superadmin']), getStaffInfo);
router.delete('/api/staff/:id', checkToken, rolePermission(['admin','superadmin']), deleteStaff);
router.put('/api/staff/:id', checkToken, rolePermission(['admin','superadmin']), changeStaff);

export default router;
