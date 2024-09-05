import { Request, Response } from "express";
import { db } from "../db/db";
import bcrypt from "bcrypt";
export const createUser = async (req: Request, res: Response) => {
  const {
    email,
    username,
    password,
    firstname,
    lastname,
    phone,
    dob,
    gender,
    image,
    role,
  } = req.body;

  console.log(req.body);

  var data: any = {
    email,
    username,
    password,
    firstname,
    lastname,
    phone,
    dob: dob ? new Date(dob) : new Date(),
    gender,
    image: image ? image : "https://fakeimg.pl/300/",
  };

  if (role) {
    data = {
      ...data,
      role,
    };
  }

  console.log("data", data);

  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    console.log("existingUser");
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Email already exists", data: null });
    }

    const existingUsername = await db.user.findUnique({
      where: {
        username,
      },
    });

    console.log("existingUsername");
    if (existingUsername) {
      return res
        .status(409)
        .json({ error: "Username already exists", data: null });
    }
    const existingPhone = await db.user.findUnique({
      where: {
        phone,
      },
    });
    console.log("existingPhone");

    if (existingPhone) {
      return res
        .status(409)
        .json({ error: "Phone number already exists", data: null });
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    console.log(hashedPassword);
    const user = await db.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    console.log("user", user);
    const { password: _, ...createdUser } = user;
    return res.status(201).json({ user: createdUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    console.log("Hello");
    var users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(users);

    const filteredUsers = users.map((user) => {
      const { password: _, ...rest } = user;
      return rest;
    });

    return res.status(200).json({ users: filteredUsers });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id: idParam } = req.params;
    const id = parseInt(idParam);
    const user = await db.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password: _, ...rest } = user;

    return res.status(200).json({ user: rest });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id: idParam } = req.params;
    const id = parseInt(idParam);
    const {
      email,
      username,
      firstname,
      lastname,
      phone,
      dob,
      gender,
      image,
      role,
      shops,
    } = req.body;
    const user = await db.user.update({
      where: { id },
      data: {
        email,
        username,
        firstname,
        lastname,
        phone,
        dob,
        gender,
        image,
        role,
        shops,
      },
    });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id: idParam } = req.params;
    const id = parseInt(idParam);
    const user = await db.user.delete({ where: { id } });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const { id: idParam } = req.params;
    const id = parseInt(idParam);
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const user = await db.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    await db.user.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    });
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};
