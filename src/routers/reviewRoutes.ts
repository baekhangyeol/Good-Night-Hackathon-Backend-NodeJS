import { Router } from "express";
import { ReviewController } from "../controllers/ReviewController";

const reviewRouter = Router();
const reviewController = new ReviewController();

reviewRouter.post('/:movie_id', (req, res) => reviewController.addReview(req, res));
reviewRouter.get('/:movie_id', (req, res) => reviewController.getReviews(req, res));

export default reviewRouter;