import { RSKvittering } from '../../../types/rs-types/rsReisetilskudd'

export const kvitteringBil: RSKvittering = {
    kvitteringId: 'tetstsgddgsdsdsdsdsdgsdg',
    blobId: '2134afw4f4q6',
    navn: 'foo.txt',
    storrelse: 1024 * 920,
    belop: 3220,
    datoForReise: '2020-05-01',
    transportmiddel: 'EGEN_BIL',
}

export const kvitteringTaxi: RSKvittering = {
    kvitteringId: 'dhdywdjdjsjdsjdscehshdsd',
    blobId: '213456',
    navn: 'bar.jpg',
    storrelse: 812 * 920,
    belop: 220,
    datoForReise: '2034-09-29',
    transportmiddel: 'TAXI',
}

const mockKvitteringer: RSKvittering[] = [
    kvitteringBil,
    kvitteringTaxi,
]

export default mockKvitteringer
