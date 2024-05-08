import { Router } from "express";
import { MovieController } from "../controllers/MovieController";

const movieRouter = Router();
const movieController = new MovieController();

movieRouter.post('/', (req, res) => movieController.registerMovie(req, res));
movieRouter.delete('/:id', (req, res) => movieController.deleteMovie(req, res));
movieRouter.get('/:id', (req, res) => movieController.getMovie(req, res));
movieRouter.put('/:id', (req, res) => movieController.updateMovie(req, res));
movieRouter.get('/', (req, res) => movieController.getMovies(req, res));

movieRouter.use(errorHandler);

export default movieRouter;