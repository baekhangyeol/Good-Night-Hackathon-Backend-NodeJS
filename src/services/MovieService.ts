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

    public async getMovies(genre?: string, isShowing?: boolean): Promise<Movie[]> {
        try {
            const query = this.movieRepository.createQueryBuilder("movie")
                .where("movie.deletedAt IS NULL");
            
            if (genre) {
                query.andWhere("movie.genre = :genre", { genre });
            }

            if(isShowing !== undefined) {
                query.andWhere("movie.isShowing = :isShowing", { isShowing });
            }

            query.orderBy("movie.releaseDate", "ASC");

            return await query.getMany();
        } catch (error) {
            throw new Error("Failed to get movies: " + error.message);
        }
    }

    public async getMoviesWithRatings(page: number, limit: number, minRating?: number): Promise<any> {
        try {
            const query = this.movieRepository.createQueryBuilder("movie")
                .leftJoinAndSelect("movie.reviews", "review")
                .select("movie.id", "id")
                .addSelect("movie.title", "title")
                .addSelect("movie.genre", "genre")
                .addSelect("movie.releaseDate", "releaseDate")
                .addSelect("movie.endDate", "endDate")
                .addSelect("movie.isShowing", "isShowing")
                .addSelect("AVG(review.rating)", "averageRating")
                .groupBy("movie.id")
                .orderBy("averageRating", "DESC")
                .offset((page - 1) * limit)
                .limit(limit);
            
            if (minRating) {
                query.having("averageRating >= :minRating", { minRating });
            }

            const [result, total] = await query.getRawMany();

            return { data: result, total, page, limit };
        } catch (error) {
            throw new Error("Failed to get movies with ratings: " + error.message);
        }
    }
}
