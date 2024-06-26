import { Request, Response } from "express";
import { ReviewService } from "../services/ReviewService";
import { IReview, mapToReviewDTO } from "../types/review";
import ReviewVerify from "../middleware/verify/reviewVerify";

export class ReviewController {
    private reviewService: ReviewService;
    private reviewVerify: ReviewVerify;

    constructor(reviewService: ReviewService, reviewVerify: ReviewVerify) {
        this.reviewService = reviewService;
        this.reviewVerify = reviewVerify;
    }

    public async addReview(req: Request, res: Response): Promise<void> {
        try {
            const movieId = parseInt(req.params.movie_id);
            this.reviewVerify.validateReviewData(req.body);
            const reviewData = mapToReviewDTO(req.body, movieId);
            const review = await this.reviewService.addReview(reviewData);
            res.status(201).json(review);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    public async getReviews(req: Request, res: Response): Promise<void> {
        try {
            const movieId = parseInt(req.params.movie_id);
            const minRating = parseFloat(req.query.min_rating as string);
            const reviews = await this.reviewService.getReviews(movieId, minRating);
            res.status(200).json(reviews);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}