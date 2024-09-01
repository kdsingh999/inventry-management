import express, { Request, Response } from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer,
} from "../controllers";

const router = express.Router();

router.post("/customer", createCustomer);
router.get("/customer", getCustomers);
router.get("/customer/:id", getCustomerById);
router.put("/customer/:id", updateCustomer);
router.delete("/customer/:id", deleteCustomer);

export { router as customerRouter };
