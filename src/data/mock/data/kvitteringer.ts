import { RSKvittering } from '../../../types/rs-types/rs-kvittering'

export const kvitteringBil: RSKvittering = {
    blobId: '2134afw4f4q6',
    belop: 3220,
    datoForUtgift: '2020-05-01',
    typeUtgift: 'PARKERING',
    opprettet: '2020-05-01'
}

export const kvitteringTaxi: RSKvittering = {
    blobId: '213456',
    belop: 220,
    datoForUtgift: '2034-09-29',
    typeUtgift: 'TAXI',
    opprettet: '2034-09-29'
}

const mockKvitteringer: RSKvittering[] = [
    kvitteringBil,
    kvitteringTaxi,
]

export default mockKvitteringer
