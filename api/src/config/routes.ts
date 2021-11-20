import { Router } from "express";
import MovieController from "../controllers/MovieController";

const router = Router();
router.get("/movies", MovieController.index);
router.get("/movies/:id", MovieController.view);
router.post("/movies", MovieController.create);

export default router;
