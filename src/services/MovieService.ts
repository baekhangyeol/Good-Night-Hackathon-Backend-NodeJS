import { getRepository } from "typeorm";
import { Movie } from "../entity/Movie";
import { IMovie } from "../types/movie";
import { dataSource } from "..";

export class MovieService {
    public static async createMovie(movieData: IMovie): Promise<Movie> {
        const movieRepository = dataSource.getRepository(Movie);

        const movie = new Movie(
            movieData.title,
            movieData.genre,
            movieData.releaseDate,
            movieData.endDate,
            movieData.isShowing
        );

        await movieRepository.save(movie);
        return movie;
    }
}