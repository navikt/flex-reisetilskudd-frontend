import { UtgiftTyper } from '../enums'

export interface RSKvittering {
    id?: string;
    blobId?: string;
    datoForUtgift?: string;
    belop?: number; // Beløp i heltall øre
    storrelse?: number;
    typeUtgift?: UtgiftTyper;
}
