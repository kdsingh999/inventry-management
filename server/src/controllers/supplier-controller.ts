import { Request, Response } from "express";
import { db } from "../db/db";

export const createSupplier = async (req: Request, res: Response) => {
  try {
    const {
      supplierType,
      name,
      contactPerson,
      email,
      phone,
      location,
      country,
      website,
      taxPin,
      registrationNumber,
      bankAccountNumber,
      bankName,
      IFCCode,
      paymentTerms,
      logo,
      rating,
      notes,
    } = req.body;
    const supplier = await db.supplier.create({
      data: {
        supplierType,
        name,
        contactPerson,
        email,
        phone,
        location,
        country,
        website,
        taxPin,
        registrationNumber,
        bankAccountNumber,
        bankName,
        IFCCode,
        paymentTerms,
        logo,
        rating,
        notes,
      },
    });
    return res.status(200).json({ supplier });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const getSuppliers = async (req: Request, res: Response) => {
  try {
    const suppliers = await db.supplier.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({ suppliers });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const getSupplierById = async (req: Request, res: Response) => {
  try {
    const { id: idParam } = req.params;
    const id = parseInt(idParam);
    const supplier = await db.supplier.findUnique({
      where: {
        id,
      },
    });

    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    return res.status(200).json({ supplier });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const updateSupplier = async (req: Request, res: Response) => {
  try {
    const { id: idParam } = req.params;
    const id = parseInt(idParam);
    const {
      supplierType,
      name,
      contactPerson,
      email,
      phone,
      location,
      country,
      website,
      taxPin,
      registrationNumber,
      bankAccountNumber,
      bankName,
      IFCCode,
      paymentTerms,
      logo,
      rating,
      notes,
    } = req.body;

    let supplier = await db.supplier.findUnique({
      where: {
        id,
      },
    });
    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    const updatedSupplier = await db.supplier.update({
      where: {
        id: supplier.id,
      },
      data: {
        supplierType,
        name,
        contactPerson,
        email,
        phone,
        location,
        country,
        website,
        taxPin,
        registrationNumber,
        bankAccountNumber,
        bankName,
        IFCCode,
        paymentTerms,
        logo,
        rating,
        notes,
      },
    });
    return res
      .status(200)
      .json({ updatedSupplier, message: "Supplier updated successfully" });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const { id: idParam } = req.params;
    const id = parseInt(idParam);

    let supplier = await db.supplier.findUnique({
      where: {
        id,
      },
    });
    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    supplier = await db.supplier.delete({
      where: {
        id,
      },
    });
    return res
      .status(200)
      .json({ supplier, message: "Supplier deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};
