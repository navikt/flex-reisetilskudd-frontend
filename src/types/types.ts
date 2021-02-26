import { RSReisetilskudd } from './rs-types/rs-reisetilskudd'
import { dayjsToDate } from '../utils/dato'
import { TagTyper } from './enums'
import { RSSporsmal } from './rs-types/rs-sporsmal'
import { RSSvar } from './rs-types/rs-svar'
import { RSKvittering } from './rs-types/rs-kvittering'
import { splittTagOgIndex } from '../components/sporsmal/sporsmal-utils'

export interface NaermesteLeder {
    navn: string;
    epost: string;
    mobil: string;
    orgnummer: string;
    organisasjonsnavn: string;
    aktivTom: string;
}

export interface Arbeidsgiver {
    navn: string;
    orgnummer: string;
    naermesteLeder?: NaermesteLeder;
}

export interface ArbeidsgiverInterface {
    navn: string,
    orgNr: string,
}

export interface Brodsmule {
    sti: string;
    tittel: string;
    mobilTittel?: string;
    erKlikkbar?: boolean;
}

export enum Visningskriterie {
    NEI = 'NEI',
    JA = 'JA',
    CHECKED = 'CHECKED'
}

export enum Svartype {
    JA_NEI = 'JA_NEI',
    CHECKBOX = 'CHECKBOX',
    CHECKBOX_GRUPPE = 'CHECKBOX_GRUPPE',
    CHECKBOX_PANEL = 'CHECKBOX_PANEL',
    DATOER = 'DATOER',
    BELOP = 'BELOP',
    KILOMETER = 'KILOMETER',
    KVITTERING = 'KVITTERING',
}

export interface Svarliste {
    sporsmalId: string;
    svar: Svar[];
}

export interface Svar {
    id?: string;
    verdi?: string;
    kvittering?: Kvittering;
}

export interface Kvittering {
    blobId: string;
    datoForUtgift: Date;
    belop: number; // Beløp i heltall øre
    typeUtgift: keyof typeof UtgiftTyper;
    opprettet?: Date;
}

export enum UtgiftTyper {
    OFFENTLIG_TRANSPORT = 'Offentlig transport',
    TAXI = 'Taxi',
    PARKERING = 'parkering',
    BOMPENGER = 'Bompenger',
    ANNET = 'Annet'
}

export class Reisetilskudd {
    id: string;
    status: 'FREMTIDIG' | 'ÅPEN' | 'PÅBEGYNT' | 'SENDBAR' | 'SENDT' | 'AVBRUTT'
    sykmeldingId: string;
    fnr: string;
    fom: Date;
    tom: Date;
    opprettet: Date;
    endret: Date;
    sendt?: Date;
    avbrutt?: Date;
    arbeidsgiverOrgnummer?: string;
    arbeidsgiverNavn?: string;
    sporsmal: Sporsmal[]

    constructor(
        rsReisetilskudd: RSReisetilskudd
    ) {
        this.id = rsReisetilskudd.id
        this.status = rsReisetilskudd.status
        this.sykmeldingId = rsReisetilskudd.sykmeldingId
        this.fnr = rsReisetilskudd.fnr
        this.fom = dayjsToDate(rsReisetilskudd.fom)!
        this.tom = dayjsToDate(rsReisetilskudd.tom)!
        this.opprettet = dayjsToDate(rsReisetilskudd.opprettet)!
        this.endret = dayjsToDate(rsReisetilskudd.endret)!
        this.sendt = dayjsToDate(rsReisetilskudd.sendt)
        this.avbrutt = dayjsToDate(rsReisetilskudd.avbrutt)
        this.arbeidsgiverOrgnummer = rsReisetilskudd.arbeidsgiverOrgnummer || undefined
        this.arbeidsgiverNavn = rsReisetilskudd.arbeidsgiverNavn || undefined
        this.sporsmal = rsToSporsmal(rsReisetilskudd.sporsmal, undefined as any, true)
    }
}

export class Sporsmal {
    id: string;
    tag: TagTyper;
    tagIndex?: number;
    overskrift: string;
    sporsmalstekst: string;
    undertekst?: string;
    svartype: Svartype;
    min?: string;
    max?: string;
    kriterieForVisningAvUndersporsmal?: Visningskriterie;
    svarliste: Svarliste;
    undersporsmal: Sporsmal[];
    parentKriterie?: Visningskriterie;
    erHovedsporsmal: boolean;

    constructor(rsspm: RSSporsmal, kriterie: string | null, erHovedsporsmal: boolean) {
        this.id = rsspm.id
        const pair = splittTagOgIndex(rsspm.tag)
        this.tag = pair.key
        this.tagIndex = pair.value
        this.overskrift = rsspm.overskrift === null ? '' : rsspm.overskrift
        this.sporsmalstekst = rsspm.sporsmalstekst === null ? '' : rsspm.sporsmalstekst
        this.undertekst = rsspm.undertekst || undefined
        this.svartype = rsspm.svartype as Svartype
        this.min = rsspm.min || undefined
        this.max = rsspm.max || undefined
        this.kriterieForVisningAvUndersporsmal = rsspm.kriterieForVisningAvUndersporsmal as Visningskriterie || undefined
        this.svarliste = { sporsmalId: rsspm.id, svar: rsToSvar(rsspm.svar) }
        this.undersporsmal = rsToSporsmal(rsspm.undersporsmal, rsspm.kriterieForVisningAvUndersporsmal, false)
        this.parentKriterie = kriterie as Visningskriterie
        this.erHovedsporsmal = erHovedsporsmal
    }
}

const rsToSporsmal = (spms: RSSporsmal[], kriterie: string | null, erHovedsporsmal: boolean) => {
    const sporsmals: Sporsmal[] = []
    if (spms === undefined) {
        return sporsmals
    }
    spms.forEach(rssp => {
        const spm: Sporsmal = new Sporsmal(rssp, kriterie, erHovedsporsmal)
        sporsmals.push(spm)
    })

    return sporsmals
}

const rsToSvar = (svar: RSSvar[]): Svar[] => {
    return svar.map(rsSvar => {
        return {
            id: rsSvar.id || undefined,
            verdi: rsSvar.verdi || undefined,
            kvittering: rsToKvittering(rsSvar.kvittering)
        }
    })
}

export const rsToKvittering = (rsKvittering: RSKvittering | null) => {
    return (rsKvittering == null) ? undefined : {
        blobId: rsKvittering.blobId,
        datoForUtgift: dayjsToDate(rsKvittering.datoForUtgift),
        belop: rsKvittering.belop,
        typeUtgift: rsKvittering.typeUtgift,
        opprettet: dayjsToDate(rsKvittering.opprettet) || undefined
    } as Kvittering
}
