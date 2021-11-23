import { Router } from "express";
import AuthValidator from "../../validators/AuthValidator";
import AuthController from "../../controllers/AuthController";

const authRoutes = Router();
authRoutes.post("/", AuthValidator, AuthController.auth);

export default authRoutes;
