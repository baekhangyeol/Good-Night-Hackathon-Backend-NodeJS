import { Repository } from "typeorm";
import { Review } from "../entity/Review";
import { dataSource } from "..";
import { IReview } from "../types/review";

export class ReviewService {
    private get reviewRepository(): Repository<Review> {
        return dataSource.getRepository(Review);
    }

    public async addReview(reviewData: IReview): Promise<Review> {
        try {
            const review = this.reviewRepository.create({
                rating: reviewData.rating,
                content: reviewData.content,
                movie: { id: reviewData.movieId }
            });
            await this.reviewRepository.save(review);
            return review;
        } catch (error) {
            throw new Error("Failed to add review: " + error.message);
        }
    }

    public async getReviews(movieId: number): Promise<Review[]> {
        try {
            const reviews = await this.reviewRepository.createQueryBuilder("review")
                .where("review.movieId = :movieId", { movieId })
                .getMany();
            return reviews;
        } catch (error) {
            throw new Error("Failed to get reviews: " + error.message);
        }
    }
}