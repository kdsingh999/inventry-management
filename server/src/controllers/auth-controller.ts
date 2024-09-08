import { Request, Response } from "express";
import { db } from "../db/db";
import bcrypt from "bcrypt";
import { generateJWT } from "../utils/generate-jwt";

export const login = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    let user = null;
    if (email) {
      user = await db.user.findFirst({
        where: {
          email,
        },
      });
    } else if (username) {
      user = await db.user.findFirst({
        where: {
          username,
        },
      });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const verified = await bcrypt.compare(password, user.password);
    if (!verified) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateJWT({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    });

    const { password: _, ...rest } = user;

    return res.status(200).json({ token, user: rest });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};
