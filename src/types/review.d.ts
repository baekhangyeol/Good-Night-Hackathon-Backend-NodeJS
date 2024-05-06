import { IMovie } from "./movie";

export interface IReview {
    id?: number;
    rating: number;
    content: string;
    movieId: number;
    createdAt?: Date;
    updatedAt?: Date;
}
