import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import router from "./config/routes";
import { pagination } from "typeorm-pagination";

const app = express();
app.use(express.json());
app.use(pagination);
app.use(router);

createConnection().then(() => {
  app.listen(5221, () => console.log("API is running on port 5221..."));
}).catch((error) => console.log(error));

