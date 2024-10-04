export type SingleGameType = {
    id: number;
    name: string;
    image: string;
    descr: string;
    isActive: boolean;
    wallet_address: string,
    video_url: string,
    createdAt: string;
    updatedAt: string;
}

export type GetGamesType = {
    meta: {
        totalGames: number,
        currentPage: number,
        limit: number,
        totalPages: number,
    },
    games: SingleGameType[]
}