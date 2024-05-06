import { IMovie } from "./movie";

export interface IReview {
    id?: number;
    rating: number;
    content: string;
    movieId: number;  // This replaces the movie object
    createdAt?: Date;
    updatedAt?: Date;
}
