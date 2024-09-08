import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers";
import express, { Request, Response } from "express";

const router = express.Router();

router.post("/product", createProduct);
router.get("/products", getProducts);
router.get("/product/:id", getProductById);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export { router as productRouter };
