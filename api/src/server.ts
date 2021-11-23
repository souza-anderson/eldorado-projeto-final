import express from "express";
import router from "./config/routes";
import { resolve } from "path";
import { createConnection } from "typeorm";
import { pagination } from "typeorm-pagination";

const app = express();
app.use(express.json());
app.use(
  "/static/movies",
  express.static(resolve(__dirname, "..", "public", "static", "uploads"))
);
app.use(pagination);
app.use(router);

createConnection().then(() => {
  app.listen(5221, () => console.log("API is running on port 5221..."));
}).catch((error) => console.log(error));

