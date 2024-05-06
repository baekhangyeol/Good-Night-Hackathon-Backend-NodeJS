import { Router } from "express";
import { MovieController } from "../controllers/MovieController";

const movieRouter = Router();
const movieController = new MovieController();

movieRouter.post('/', (req, res) => movieController.registerMovie(req, res));
movieRouter.delete('/:id', (req, res) => movieController.deleteMovie(req, res));
movieRouter.get('/:id', (req, res) => movieController.getMovie(req, res));

export default movieRouter;