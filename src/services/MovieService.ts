import { Repository } from "typeorm";
import { Movie } from "../entity/Movie";
import { IMovie } from "../types/movie";
import { dataSource } from "..";

export class MovieService {
    private get movieRepository(): Repository<Movie> {
        return dataSource.getRepository(Movie);
    }

    public async createMovie(movieData: IMovie): Promise<Movie> {
        try {
            const movie = this.movieRepository.create(movieData);
            await this.movieRepository.save(movie);
            return movie;
        } catch (error) {
            throw new Error("Failed to create movie: " + error.message);
        }
    }

    public async deleteMovie(id: number): Promise<void> {
        try {
            await this.movieRepository.softDelete(id);
        } catch (error) {
            throw new Error("Failed to delete movie: " + error.message);
        }
    }

    public async getMovie(id: number): Promise<Movie> {
        try {
            const movie = await this.movieRepository.findOneBy({ id });
            if (!movie) throw new Error("Movie not found");
            return movie;
        } catch (error) {
            throw new Error("Failed to get movie: " + error.message);
        }
    }

    public async updateMovie(id: number, movieData: IMovie): Promise<Movie> {
        try {
            const movie = await this.getMovie(id);
            this.movieRepository.merge(movie, movieData);
            await this.movieRepository.save(movie);
            return movie;
        } catch (error) {
            throw new Error("Failed to update movie: " + error.message);
        }
    }
}
