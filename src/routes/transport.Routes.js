import express from 'express';
const router = express.Router();

import { addTransport, changeTransport, deleteTransport, getTransports } from '../controllers/transport.Controller.js';
import checkToken from '../middlewares/checkToken.js';
import rolePermission from '../middlewares/rolePermission.js';

router.post('/api/addTransport', checkToken, rolePermission(['admin','superadmin']), addTransport);
router.put('/api/putTransport/:id', checkToken, rolePermission(['admin','superadmin']), changeTransport);
router.delete('/api/deleteTransport/:id', checkToken, rolePermission(['admin','superadmin']), deleteTransport);
router.get('/api/transports', checkToken, rolePermission(['admin','superadmin','staff']), getTransports);

export default router;