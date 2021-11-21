import { Router } from "express";
import movieRoutes from "./movies";

const router = Router();

router.use("/movies", movieRoutes);
//router.use("/users", userRoutes);
//router.use("/genre", genreRoutes);

export default router;