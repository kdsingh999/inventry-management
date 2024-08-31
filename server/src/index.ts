import express, { Request, Response, Express } from "express";
const app: Express = express();
require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  const data = [
    {
      name: "test",
      id: 1,
    },
    {
      name: "test2",
      id: 2,
    },
  ];
  res.status(200).json(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
