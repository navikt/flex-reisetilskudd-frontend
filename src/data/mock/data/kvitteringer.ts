import { RSKvittering } from '../../../types/rs-types/rsReisetilskudd'

export const kvitteringBil: RSKvittering = {
    reisetilskuddId: '6969',
    kvitteringId: 'tetstsgddgsdsdsdsdsdgsdg',
    navn: 'foo.txt',
    storrelse: 1024 * 920,
    belop: 32.2,
    fom: '2020-05-01',
    transportmiddel: 'EGEN_BIL',
}

export const kvitteringTaxi: RSKvittering = {
    reisetilskuddId: '12352',
    kvitteringId: 'dhdywdjdjsjdsjdscehshdsd',
    navn: 'bar.jpg',
    storrelse: 812 * 920,
    belop: 2.2,
    fom: '2034-09-29',
    transportmiddel: 'TAXI',
}

const mockKvitteringer: RSKvittering[] = [
    kvitteringBil,
    kvitteringTaxi,
]

export default mockKvitteringer
