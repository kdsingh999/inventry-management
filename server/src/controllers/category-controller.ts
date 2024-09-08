import { Request, Response } from "express";
import { db } from "../db/db";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug, parentId } = req.body;

    const category = await db.category.create({
      data: {
        name,
        slug,
        parentId: parentId ? Number(parentId) : null,
      },
    });

    return res
      .status(201)
      .json({ category, message: "Category created successfully" });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await db.category.findUnique({
      where: {
        id: Number(id),
      },
    });
    return res.status(200).json({ category });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug, parentId } = req.body;
    const category = await db.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        slug,
        parentId: parentId ? Number(parentId) : null,
      },
    });
    return res.status(200).json({ category });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await db.category.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(200).json({ category });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};
