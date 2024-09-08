import express, { Application } from "express";
require("dotenv").config();
const cors = require("cors");
import {
  customerRouter,
  userRouter,
  shopRouter,
  supplierRouter,
  authRouter,
  categoryRouter,
  brandRouter,
  unitRouter,
  productRouter,
} from "./routers";

const port = process.env.PORT || 3000;

const app: Application = express();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use("/api", customerRouter);
app.use("/api", userRouter);
app.use("/api", shopRouter);
app.use("/api", supplierRouter);
app.use("/api", authRouter);
app.use("/api", categoryRouter);
app.use("/api", brandRouter);
app.use("/api", unitRouter);
app.use("/api", productRouter);
