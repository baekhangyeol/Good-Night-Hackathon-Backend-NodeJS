import { Request, Response } from "express";
import { ReviewService } from "../services/ReviewService";
import { IReview } from "../types/review";

export class ReviewController {
    private reviewService: ReviewService;

    constructor() {
        this.reviewService = new ReviewService();
    }

    public async addReview(req: Request, res: Response): Promise<void> {
        try {
            const movieId = parseInt(req.params.movie_id);
            if (isNaN(movieId)) {
                throw new Error("Invalid movie ID");
            }

            this.validateReviewData(req.body);
            const reviewData: IReview = this.mapToReviewDto(req.body, movieId);
            const review = await this.reviewService.addReview(reviewData);
            res.status(201).json(review);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    private validateReviewData(data: any): void {
        if (!data.rating || !data.content) {
            throw new Error("Rating and content are required");
        }
    }

    private mapToReviewDto(data: any, movieId: number): IReview {
        return {
            rating: data.rating,
            content: data.content,
            movieId: movieId
        };
    }
}