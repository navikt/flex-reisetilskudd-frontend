import { RSSvar } from './rs-svar'
import { RSKvittering } from './rs-kvittering'

export interface RSSvarliste {
    sporsmalId: string;
    svar: RSSvar[] | RSKvittering[];
}
