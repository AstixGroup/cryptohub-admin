export type SingleMovieType = {
    id: number;
    name: string;
    video_360: number;
    video_480: number;
    video_720: number;
    video_1080: number;
    downloads: number,
    image: string,
    createdAt: string
    updatedAt: string
}

export type GetMoviesType = {
    meta: {
        totalMovies: number,
        currentPage: number,
        limit: number,
        totalPages: number,
    },
    movies: SingleMovieType[]
}
