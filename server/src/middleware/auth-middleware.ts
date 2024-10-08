import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { db } from "../db/db";
import { verifyJWT } from "../utils/generate-jwt";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
  user: any;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).send("Please authenticate");
    }

    const decoded = verifyJWT(token);
    (req as CustomRequest).token = decoded;

    (req as CustomRequest).user = await db.user.findUnique({
      where: { id: ((req as CustomRequest).token as JwtPayload).id },
    });

    console.log("after auth", (req as CustomRequest).user);

    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = (req as CustomRequest).token;

    if (user.role !== "ADMIN") {
      return res.status(401).send("You are not authorized!");
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send("Unauthorized");
  }
};
