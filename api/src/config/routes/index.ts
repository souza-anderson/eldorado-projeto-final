import { Router } from "express";
import genreRoutes from "./genres";
import movieRoutes from "./movies";
import userRoutes from "./users";

const router = Router();

router.use("/movies", movieRoutes);
router.use("/genres", genreRoutes);
router.use("/users", userRoutes);

export default router;