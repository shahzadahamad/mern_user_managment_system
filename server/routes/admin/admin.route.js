import express from 'express';
import { deleteUser, userData } from '../../controllers/admin/admin.controller.js';
import { verifyToken } from '../../utils/verifyAdmin.js';

const router = express.Router();

router.get('/user-data',userData);
router.delete('/delete-user/:id', verifyToken ,deleteUser);

export default router;