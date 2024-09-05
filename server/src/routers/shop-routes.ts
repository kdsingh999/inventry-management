import {
  createShop,
  getAttendantsByShopId,
  getShops,
} from "../controllers/shop-controller";
import express, { Request, Response } from "express";

const router = express.Router();

router.post("/shop", createShop);
router.get("/shop", getShops);
router.get("/shop/attendant/:id", getAttendantsByShopId);

export { router as shopRouter };
