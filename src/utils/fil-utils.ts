const sizes = [ 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ]
const k = 1024

const formaterFilstørrelse = (bytes: number, decimals = 2) : string => {
    if (bytes === 0) return '0 Bytes'
    const dm = decimals < 0 ? 0 : decimals
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / (k ** i)).toFixed(dm)).toLocaleString()} ${sizes[i].toLowerCase()}`
}

export const filstørrelseTilBytes = (filstørrelse: string): number => {
    const mønster = /(\d+)\s*(\w+)/
    const verdi = parseInt(filstørrelse.match(mønster)![1], 10)
    const størrelse = filstørrelse.match(mønster)![2]
    const i = sizes.indexOf(størrelse)
    return verdi * (k ** i)
}

export default formaterFilstørrelse
