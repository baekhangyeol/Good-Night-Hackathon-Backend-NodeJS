export class MovieVerify {
    public validateMovieData(data: any): void {
        const { title, genre, releaseDate, endDate, isShowing } = data;
        if (!title || !genre || !releaseDate || !endDate || isShowing === undefined) {
            throw new Error("All fields are required");
        }
        const validGenres = ['Thriller', 'Romance', 'Comedy', 'Action'];
        if (!validGenres.includes(genre)) {
            throw new Error("Invalid genre");
        }
    }
}

export default MovieVerify;