import { KvitteringInterface, Transportmiddel } from '../../models/kvittering'

const mockKvitteringer: KvitteringInterface[] = [
    {
        reisetilskuddId: '6969',
        kvitteringId: 'tetstsgddgsdsdsdsdsdgsdg',
        navn: 'foo.txt',
        storrelse: 1024 * 920,
        belop: 32.2,
        fom: new Date('2020-05-01'),
        transportmiddel: Transportmiddel.EGEN_BIL,
    },
    {
        reisetilskuddId: '12352',
        kvitteringId: 'dhdywdjdjsjdsjdscehshdsd',
        navn: 'bar.jpg',
        storrelse: 812 * 920,
        belop: 2.2,
        fom: new Date('2034-09-29'),
        transportmiddel: Transportmiddel.TAXI,
    },
]

export default mockKvitteringer
