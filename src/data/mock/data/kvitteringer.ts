import { RSKvittering } from '../../../types/rs-types/rs-kvittering'
import { UtgiftTyper } from '../../../types/enums'

export const kvitteringBil: RSKvittering = {
    id: 'tetstsgddgsdsdsdsdsdgsdg',
    blobId: '2134afw4f4q6',
    storrelse: 1024 * 920,
    belop: 3220,
    datoForUtgift: '2020-05-01',
    typeUtgift: UtgiftTyper.BOMPENGER,
}

export const kvitteringTaxi: RSKvittering = {
    id: 'dhdywdjdjsjdsjdscehshdsd',
    blobId: '213456',
    storrelse: 812 * 920,
    belop: 220,
    datoForUtgift: '2034-09-29',
    typeUtgift: UtgiftTyper.TAXI,
}

const mockKvitteringer: RSKvittering[] = [
    kvitteringBil,
    kvitteringTaxi,
]

export default mockKvitteringer
