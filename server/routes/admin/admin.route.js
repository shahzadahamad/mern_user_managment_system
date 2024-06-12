import express from "express";
import {
  deleteUser,
  userData,
  updateUser,
} from "../../controllers/admin/admin.controller.js";
import { verifyToken } from "../../utils/verifyAdmin.js";

const router = express.Router();

router.get("/user-data", verifyToken, userData);
router.post("/update-user/:id", verifyToken, updateUser);
router.delete("/delete-user/:id", verifyToken, deleteUser);

export default router;
