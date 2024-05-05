import { IMovie } from "./movie";

export interface IReview {
    id?: number;
    rating: number;
    content: string;
    movie: IMovie;
    createdAt?: Date;
    updatedAt?: Date;
}