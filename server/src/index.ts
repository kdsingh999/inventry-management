import express, { Application } from "express";
require("dotenv").config();
const cors = require("cors");
import { customerRouter } from "./routers";

const port = process.env.PORT || 3000;

const app: Application = express();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use("/api", customerRouter);
