import { Router } from "express";
import { ReviewController } from "../controllers/ReviewController";
import Container from "typedi";

const reviewRouter = Router();
const reviewController = Container.get(ReviewController);

reviewRouter.post('/:movie_id', (req, res) => reviewController.addReview(req, res));
reviewRouter.get('/:movie_id', (req, res) => reviewController.getReviews(req, res));

export default reviewRouter;