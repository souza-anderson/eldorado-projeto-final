import express, { Request, Response } from "express";
import { createConnection } from "typeorm";

const app = express();

app.get("/", (request: Request, response: Response) => {
  return response.json({
    status: "success",
    message: "API is running with successfuly"
  });
})

createConnection().then(() => {
  app.listen(5221, () => console.log("API is running on port 5221..."));
}).catch((error) => console.log(error));

