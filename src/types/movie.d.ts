export interface IMovie {
    title: string;
    genre: string;
    releaseDate: Date;
    endDate: Date;
    isShowing: boolean;
}

export function mapToMovieDTO(data: any): IMovie {
    return {
        title: data.title,
        genre: data.genre,
        releaseDate: data.releaseDate,
        endDate: data.endDate,
        isShowing: data.isShowing
    };
}