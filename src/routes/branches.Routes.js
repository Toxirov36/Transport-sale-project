import express from 'express';
const router = express.Router();
import checkToken from '../middlewares/checkToken.js';
import rolePermission from '../middlewares/rolePermission.js';
import { addBranch, changeBranch, deleteBranch, getBranches, getBranchInfo } from '../controllers/branch.Controller.js';


router.post('/api/addBranch', checkToken, rolePermission(['admin','superadmin']), addBranch);
router.put('/api/putBranch/:id', checkToken, rolePermission(['admin','superadmin']), changeBranch);
router.delete('/api/deleteBranch/:id', checkToken, rolePermission(['admin','superadmin']), deleteBranch);
router.get('/api/branches', checkToken, rolePermission(['admin','superadmin']), getBranches);
router.get('/api/branch/:id', checkToken, rolePermission(['admin','superadmin']), getBranchInfo);

export default router;