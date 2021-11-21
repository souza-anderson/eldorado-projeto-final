import { Router } from "express";
import MovieController from "../controllers/MovieController";

const router = Router();
router.get("/movies", MovieController.index);
router.get("/movies/:id", MovieController.view);
router.post("/movies", MovieController.create);
router.put("/movies/:id", MovieController.update);
router.delete("/movies/:id", MovieController.delete);

export default router;
