import { Request, Response } from 'express';
import { IMovie, mapToMovieDTO } from '../types/movie';
import { MovieService } from '../services/MovieService';
import MovieVerify from '../middleware/verify/movieVerify';

export class MovieController {
    private movieService: MovieService;
    private movieVerify: MovieVerify;

    constructor() {
        this.movieService = new MovieService();
        this.movieVerify = new MovieVerify();
    }

    public async registerMovie(req: Request, res: Response): Promise<void> {
        try {
            this.movieVerify.validateMovieData(req.body);
            const movieData: IMovie = mapToMovieDTO(req.body);
            const movie = await this.movieService.createMovie(movieData);
            res.status(201).json(movie);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    public async deleteMovie(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) throw new Error("Invalid movie ID");
            await this.movieService.deleteMovie(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    public async getMovie(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) throw new Error("Invalid movie ID");
            const movie = await this.movieService.getMovie(id);
            res.status(200).json(movie);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    public async updateMovie(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) throw new Error("Invalid movie ID");
            this.movieVerify.validateMovieData(req.body);
            const movieData: IMovie = mapToMovieDTO(req.body);
            const movie = await this.movieService.updateMovie(id, movieData);
            res.status(200).json(movie);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    public async getMovies(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const minRating = parseFloat(req.query.min_rating as string);

            const result = await this.movieService.getMoviesWithRatings(page, limit, minRating);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
