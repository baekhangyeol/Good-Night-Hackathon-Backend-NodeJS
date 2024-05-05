import { Request, Response } from 'express';
import { IMovie } from '../types/movie';
import { MovieService } from '../services/MovieService';

export class MovieController {
    public static async registerMovie(req: Request, res: Response) {
        const { title, genre, releaseDate, endDate, isShowing } = req.body;

        if (!title || !genre || !releaseDate || !endDate || isShowing === undefined) {
            return res.status(400).json({ message: "모든 항목은 필수값입니다!" });
        }

        const validGenres = ['Thriller', 'Romance', 'Comedy', 'Action'];
        if (!validGenres.includes(genre)) {
            return res.status(400).json({ message: "잘못된 장르" });
        }

        const movieData: IMovie = {
            title, genre, releaseDate: new Date(releaseDate), endDate: new Date(endDate),
            isShowing: true
        };

        try {
            const movie = await MovieService.createMovie(movieData);
            res.status(201).json(movie);
        } catch (error) {
            res.status(500).json({ message: "Failed to register movie", error: error.message });
        }
    }
}
