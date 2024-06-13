import express from "express";
import {
  signup,
  signin,
  google,
  signout,
} from "../../controllers/user/auth.controller.js";
import { verifyToken } from "../../utils/verifyUser.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", verifyToken, signout);

export default router;
