import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/multer";
import MovieValidator from "../validators/MovieValidator";
import MovieController from "../controllers/MovieController";

const upload = multer(uploadConfig);

const movieRoutes = Router();
movieRoutes.get("/", MovieController.index);
movieRoutes.post("/", upload.single("poster"), MovieValidator, MovieController.create);
movieRoutes.get("/:id", MovieController.view);
movieRoutes.put("/:id", upload.single("poster"), MovieValidator, MovieController.update);
movieRoutes.delete("/:id", MovieController.delete);

export default movieRoutes;
