import { Router } from "express";
import UserValidator from "../validators/UserValidator";
import UserController from "../controllers/UserController";


const userRoutes = Router();
userRoutes.get("/", UserController.index);
userRoutes.get("/:id", UserController.view);
userRoutes.post("/", UserValidator, UserController.create);
userRoutes.put("/:id", UserValidator, UserController.update);
userRoutes.delete("/:id", UserController.delete);

export default userRoutes;
