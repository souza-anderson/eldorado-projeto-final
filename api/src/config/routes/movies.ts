import { Router } from "express";
import MovieValidator from "../../validators/MovieValidator";
import MovieController from "../../controllers/MovieController";


const movieRoutes = Router();
movieRoutes.get("/", MovieController.index);
movieRoutes.get("/:id", MovieController.view);
movieRoutes.post("", MovieValidator, MovieController.create);
movieRoutes.put("/:id", MovieValidator, MovieController.update);
movieRoutes.delete("/:id", MovieController.delete);

export default movieRoutes;
