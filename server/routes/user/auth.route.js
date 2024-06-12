import express from 'express';
import { signup, signin, google, signout, verifyUser } from '../../controllers/user/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.get('/signout', signout);
router.get('/verifyUser', verifyUser)


export default router;