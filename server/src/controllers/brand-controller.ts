import { Request, Response } from "express";
import { db } from "../db/db";

export const createBrand = async (req: Request, res: Response) => {
  try {
    const { name, slug } = req.body;
    const brand = await db.brand.create({
      data: {
        name,
        slug,
      },
    });
    return res.status(200).json({
      brand,
      message: "Brand created successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error, message: "Something went wrong" });
  }
};

export const getBrands = async (req: Request, res: Response) => {
  try {
    const brands = await db.brand.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({ brands });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error, message: "Something went wrong" });
  }
};

export const getBrandById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const brand = await db.brand.findUnique({
      where: {
        id: Number(id),
      },
    });
    return res.status(200).json({ brand });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error, message: "Something went wrong" });
  }
};

export const updateBrand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;
    const brand = await db.brand.update({
      where: {
        id: Number(id), // Convert id to number
      },
      data: {
        name,
        slug,
      },
    });
    return res.status(200).json({
      brand,
      message: "Brand updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const deleteBrand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const brand = await db.brand.delete({
      where: {
        id: Number(id), // Convert id to number
      },
    });
    return res.status(200).json({
      brand,
      message: "Brand deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};
