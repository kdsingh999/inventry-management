import { Request, Response } from "express";
import { db } from "../db/db";

export const createUnit = async (req: Request, res: Response) => {
  try {
    const { name, slug, abbreviation } = req.body;
    const unit = await db.unit.create({
      data: {
        name,
        slug,
        abbreviation,
      },
    });
    return res.status(200).json({ unit });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const getUnits = async (req: Request, res: Response) => {
  try {
    const units = await db.unit.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({ units });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const getUnitById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const unit = await db.unit.findUnique({
      where: {
        id: Number(id),
      },
    });
    return res.status(200).json({ unit });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const updateUnit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug, abbreviation } = req.body;
    const unit = await db.unit.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        slug,
        abbreviation,
      },
    });
    return res.status(200).json({ unit });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const deleteUnit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const unit = await db.unit.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(200).json({ unit });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};
