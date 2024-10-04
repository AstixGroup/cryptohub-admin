export type CryptoType = {
    id: number,
    name: string,
    price: number,
    change: number,
    minOrderAmount: number,
    maxOrderAmount: number,
    card_number: string,
    card_name: string,
    createdAt: string,
    updatedAt: string,
}

export type GetCryptosType = {
    meta: {
        totalCryptos: number,
        currentPage: number,
        limit: number,
        totalPages: number,
    },
    cryptos: CryptoType[]
}