import { Router } from "express";
import authRoutes from "./auth";
import genreRoutes from "./genres";
import movieRoutes from "./movies";
import userRoutes from "./users";

import auth from "../middlewares/AuthMiddlewares";

const router = Router();

router.use("/auth", authRoutes);

// router.use(auth);

router.use("/movies", movieRoutes);
router.use("/genres", genreRoutes);
router.use("/users", userRoutes);

export default router;