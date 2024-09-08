import {
  createUnit,
  deleteUnit,
  getUnitById,
  getUnits,
  updateUnit,
} from "../controllers";
import express, { Request, Response } from "express";

const router = express.Router();

router.post("/unit", createUnit);
router.get("/units", getUnits);
router.get("/unit/:id", getUnitById);
router.put("/unit/:id", updateUnit);
router.delete("/unit/:id", deleteUnit);

export { router as unitRouter };
