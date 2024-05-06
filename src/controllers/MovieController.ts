import { Request, Response } from 'express';
import { IMovie } from '../types/movie';
import { MovieService } from '../services/MovieService';

export class MovieController {
    private movieService: MovieService;

    constructor() {
        this.movieService = new MovieService();
    }

    public async registerMovie(req: Request, res: Response): Promise<void> {
        try {
            this.validateMovieData(req.body);
            const movieData: IMovie = this.mapToMovieDto(req.body);
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

    private validateMovieData(data: any): void {
        const { title, genre, releaseDate, endDate, isShowing } = data;
        if (!title || !genre || !releaseDate || !endDate || isShowing === undefined) {
            throw new Error("All fields are required");
        }
        const validGenres = ['Thriller', 'Romance', 'Comedy', 'Action'];
        if (!validGenres.includes(genre)) {
            throw new Error("Invalid genre");
        }
    }

    private mapToMovieDto(data: any): IMovie {
        return {
            title: data.title,
            genre: data.genre,
            releaseDate: new Date(data.releaseDate),
            endDate: new Date(data.endDate),
            isShowing: data.isShowing
        };
    }
}
