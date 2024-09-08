import express, { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  updateUserPassword,
} from "../controllers";
import { adminMiddleware, authMiddleware } from "../middleware/auth-middleware";

const router = express.Router();

router.post("/user", createUser);
router.get("/user", authMiddleware, getUsers);
router.get("/user/:id", getUserById);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.put("/user/update-password/:id", updateUserPassword);

export { router as userRouter };
