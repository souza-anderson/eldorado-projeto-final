import { Router } from "express";
import GenreValidator from "../../validators/GenreValidator";
import GenreController from "../../controllers/GenreController";


const genreRoutes = Router();
genreRoutes.get("/", GenreController.index);
genreRoutes.get("/:id", GenreController.view);
genreRoutes.post("", GenreValidator, GenreController.create);
genreRoutes.put("/:id", GenreValidator, GenreController.update);
genreRoutes.delete("/:id", GenreController.delete);

export default genreRoutes;
