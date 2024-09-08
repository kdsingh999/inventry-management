import {
  createSupplier,
  deleteSupplier,
  getSupplierById,
  getSuppliers,
  updateSupplier,
} from "../controllers";
import express, { Request, Response } from "express";

const router = express.Router();

router.post("/supplier", createSupplier);
router.get("/supplier", getSuppliers);
router.get("/supplier/:id", getSupplierById);
router.put("/supplier/:id", updateSupplier);
router.delete("/supplier/:id", deleteSupplier);

export { router as supplierRouter };
