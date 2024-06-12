import express from 'express';
import { deleteUser, userData } from '../../controllers/admin/admin.controller.js';

const router = express.Router();

router.get('/user-data',userData);
router.delete('/delete-user/:id', deleteUser);

export default router;