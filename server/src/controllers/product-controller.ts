import { Request, Response } from "express";
import { db } from "../db/db";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      sku,
      slug,
      description,
      barcode,
      batch_number,
      image,
      productCode,
      supplierId,
      tax,
      unitId,
      brandId,
      categoryId,
      expiryDate,
      alertQuantity,
      quantity,
      price,
      buyingPrice,
    } = req.body;

    const product = await db.product.create({
      data: {
        name,
        sku,
        slug,
        description,
        barcode,
        batch_number,
        image,
        productCode,
        supplierId,
        tax,
        unitId,
        brandId,
        categoryId,
        expiryDate,
        alertQuantity,
        quantity,
        price,
        buyingPrice,
      },
    });
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        supplier: true,
        unit: true,
        brand: true,
        category: true,
      },
    });
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await db.product.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        supplier: true,
        unit: true,
        brand: true,
        category: true,
      },
    });
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      sku,
      slug,
      description,
      barcode,
      batch_number,
      image,
      productCode,
      supplierId,
      tax,
      unitId,
      brandId,
      categoryId,
      expiryDate,
      alertQuantity,
      quantity,
      price,
      buyingPrice,
    } = req.body;
    const product = await db.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        sku,
        slug,
        description,
        barcode,
        batch_number,
        image,
        productCode,
        supplierId,
        tax,
        unitId,
        brandId,
        categoryId,
        expiryDate,
        alertQuantity,
        quantity,
        price,
        buyingPrice,
      },
    });
    return res
      .status(200)
      .json({ product, message: "Product updated successfully" });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await db.product.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};
