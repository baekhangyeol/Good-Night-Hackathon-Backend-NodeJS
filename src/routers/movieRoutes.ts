import { Router } from "express";
import { MovieController } from "../controllers/MovieController";

const movieRouter = Router();

movieRouter.post('/', MovieController.registerMovie);

export default movieRouter;