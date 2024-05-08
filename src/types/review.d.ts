import { IMovie } from "./movie";

export interface IReview {
    id?: number;
    rating: number;
    content: string;
    movieId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export function mapToReviewDTO(data: any, movieId: number): IReview {
    return {
        rating: data.rating,
        content: data.content,
        movieId
    };
}