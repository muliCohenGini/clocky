
export const formatter = (minutes) => {
    let zero = ''
    if ((minutes % 60) <= 9) {
        zero = '0'
    }
    const formatted = Math.floor(minutes / 60) + ":" + zero + minutes % 60
    return formatted
}
