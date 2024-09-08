import {
  createBrand,
  deleteBrand,
  getBrandById,
  getBrands,
  updateBrand,
} from "../controllers";
import express, { Request, Response } from "express";

const router = express.Router();

router.post("/brand", createBrand);
router.get("/brands", getBrands);
router.get("/brand/:id", getBrandById);
router.put("/brand/:id", updateBrand);
router.delete("/brand/:id", deleteBrand);

export { router as brandRouter };
