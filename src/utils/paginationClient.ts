export const getNumberOfPages = (total: number, take: number) => {
    return Math.ceil(total / take)
}
