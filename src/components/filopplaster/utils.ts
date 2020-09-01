const sizes = [ 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ]
const k = 1024

const formaterFilstørrelse = (bytes: number, decimals = 2) : string => {
    if (bytes === 0) return '0 Bytes'
    const dm = decimals < 0 ? 0 : decimals

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / (k ** i)).toFixed(dm))} ${sizes[i]}`
}

export const filstørrelseTilBytes = (filstørrelse: string): number => {
    const mønster = /(\d+)\s*(\w+)/
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const verdi = parseInt(filstørrelse.match(mønster)![1], 10)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const størrelse = filstørrelse.match(mønster)![2]
    const i = sizes.indexOf(størrelse)
    return verdi * (k ** i)
}

export default formaterFilstørrelse
