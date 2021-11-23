import { Router } from "express";
import authRoutes from "./auth";
import genreRoutes from "./genres";
import movieRoutes from "./movies";
import userRoutes from "./users";

const router = Router();

router.use("/auth", authRoutes);
router.use("/movies", movieRoutes);
router.use("/genres", genreRoutes);
router.use("/users", userRoutes);

export default router;