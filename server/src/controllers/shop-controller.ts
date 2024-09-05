import { Request, Response } from "express";
import { db } from "../db/db";
export const createShop = async (req: Request, res: Response) => {
  try {
    const { name, location, slug, adminId, attendants } = req.body;

    const existingShop = await db.shop.findUnique({
      where: {
        slug,
      },
    });

    if (existingShop) {
      return res.status(400).json({ error: "Shop already exists" });
    }

    const attendantsArray = Array.isArray(attendants)
      ? attendants
      : [attendants];

    const shop = await db.shop.create({
      data: {
        name,
        location,
        slug,
        adminId,
        attendants: {
          connect: attendantsArray.map((id: number) => ({ id })),
        },
      },
    });
    res.status(201).json({ shop });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const getShops = async (req: Request, res: Response) => {
  try {
    const shops = await db.shop.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        attendants: {
          select: {
            id: true,
            firstname: true,
            email: true,
          },
        },
        admin: true,
      },
    });
    res.status(200).json({ shops });
  } catch (error) {
    res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const getShopById = async (req: Request, res: Response) => {
  try {
    const { id: idParam } = req.params;
    const id = parseInt(idParam);
    const shop = await db.shop.findUnique({
      where: {
        id,
      },
      include: {
        attendants: {
          select: {
            id: true,
            firstname: true,
            email: true,
          },
        },
        admin: true,
      },
    });
    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    res.status(200).json({ shop });
  } catch (error) {
    res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const getAttendantsByShopId = async (req: Request, res: Response) => {
  try {
    const { id: idParam } = req.params;
    const id = parseInt(idParam);

    const shop = await db.shop.findUnique({
      where: {
        id,
      },
    });
    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    const attendants = await db.user.findMany({
      where: {
        attendedShops: {
          some: {
            id,
          },
        },
      },
    });

    if (!attendants) {
      return res.status(404).json({ error: "Shop not found" });
    }
    res.status(200).json({ attendants });
  } catch (error) {
    res.status(500).json({ error, message: "Something went wrong" });
  }
};
