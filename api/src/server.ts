import express from "express";
import router from "./routes";
import { resolve } from "path";
import { createConnection } from "typeorm";
import { pagination } from "typeorm-pagination";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 5221;

app.use(express.json());
app.use(
  "/static/movies",
  express.static(resolve(__dirname, "..", "public", "static", "uploads"))
);
app.use(pagination);
app.use(router);

createConnection().then(() => {
  app.listen(5221, () => console.log(`API is running on port ${port}`));
}).catch((error) => console.log(error));

