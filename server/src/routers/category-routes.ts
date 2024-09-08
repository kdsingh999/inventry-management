import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers";
import express from "express";

const router = express.Router();

router.post("/category", createCategory);
router.get("/categories", getCategories);
router.get("/category/:id", getCategoryById);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

export { router as categoryRouter };
