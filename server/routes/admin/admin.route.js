import express from 'express';
import { userData } from '../../controllers/admin/admin.controller.js';

const router = express.Router();

router.post('/user-data',userData);

export default router;