import { login } from "../controllers";
import express, { Request, Response } from "express";

const router = express.Router();

router.post("/login", login);

export { router as authRouter };
