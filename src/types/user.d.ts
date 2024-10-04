export type SingleUserType = {
    id: number
    name: string
    surname: string
    username: string
    balance: number,
    _count: {
        tasks: number,
        referrals: number,
    },
    createdAt: string
    updatedAt: string
}


export type GetUsersType = {
    meta: {
        totalUsers: number,
        currentPage: number,
        limit: number,
        totalPages: number,
    },
    users: SingleUserType[]
}

