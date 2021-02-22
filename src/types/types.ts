import { RSReisetilskudd } from './rs-types/rs-reisetilskudd'
import { dayjsToDate } from '../utils/dato'
import { TagTyper } from './enums'
import { RSSvartype } from './rs-types/rs-svartype'
import { RSSvarliste } from './rs-types/rs-svarliste'
import { RSVisningskriterieType } from './rs-types/rs-visningskriterie'
import { RSSporsmal } from './rs-types/rs-sporsmal'
import { RSSoknadstype } from './rs-types/rs-soknadstype'
import { RSSoknadstatus } from './rs-types/rs-soknadstatus'
import { RSArbeidssituasjon } from './rs-types/rs-arbeidssituasjon'
import { RSSoknadsperiode } from './rs-types/rs-soknadsperiode'
import { RSSoknad } from './rs-types/rs-soknad'

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

export enum Transport {
    OFFENTLIG = 'OFFENTLIG',
    EGEN_BIL = 'EGEN BIL',
}

export enum Transportmiddel {
    SPORSMAL_KEY = 'kvittering-transportmiddel-spørsmål',
    TAXI = 'Taxi',
    KOLLEKTIVT = 'Kollektivtransport',
    EGEN_BIL = 'Egen bil'
}

export enum ReisetilskuddStatus {
    FREMTIDIG = 'FREMTIDIG',
    ÅPEN = 'ÅPEN',
    PÅBEGYNT = 'PÅBEGYNT',
    SENDBAR = 'SENDBAR',
    SENDT = 'SENDT',
    AVBRUTT = 'AVBRUTT'
}

export class Reisetilskudd {
    id: string;
    status: string;
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
        this.status = rsReisetilskudd.status as keyof typeof ReisetilskuddStatus
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

export class Soknad {
    id: string;
    sykmeldingId: string;
    soknadstype: RSSoknadstype;
    status: RSSoknadstatus;
    arbeidssituasjon: RSArbeidssituasjon | null;
    fom?: Date;
    tom?: Date;
    avbruttDato?: Date;
    opprettetDato: Date;
    sendtTilNAVDato?: Date;
    sendtTilArbeidsgiverDato?: Date;
    arbeidsgiver?: Arbeidsgiver;
    sporsmal: Sporsmal[];
    soknadPerioder: RSSoknadsperiode[];
    korrigerer: string | null;

    constructor(
        soknad: RSSoknad
    ) {
        this.id = soknad.id
        this.sykmeldingId = soknad.sykmeldingId!
        const type = soknad.soknadstype as keyof typeof RSSoknadstype
        this.soknadstype = RSSoknadstype[type]
        const stat = soknad.status as keyof typeof RSSoknadstatus
        this.status = RSSoknadstatus[stat]
        this.fom = dayjsToDate(soknad.fom!)!
        this.tom = dayjsToDate(soknad.tom!)!
        this.korrigerer = soknad.korrigerer
        this.avbruttDato = dayjsToDate(soknad.avbruttDato!)!
        this.opprettetDato = dayjsToDate(soknad.opprettetDato!)!
        this.sendtTilNAVDato = dayjsToDate(soknad.sendtTilNAVDato!)!
        this.sendtTilArbeidsgiverDato = dayjsToDate(soknad.sendtTilArbeidsgiverDato!)!
        if (soknad.arbeidsgiver) {
            this.arbeidsgiver = {
                naermesteLeder: soknad.arbeidsgiver.naermesteLeder,
                navn: soknad.arbeidsgiver.navn,
                orgnummer: soknad.arbeidsgiver.orgnummer
            }
        }
        this.arbeidssituasjon = soknad.arbeidssituasjon as any
        this.sporsmal = rsToSporsmal(soknad.sporsmal, undefined as any, true)
        this.soknadPerioder = soknad.soknadPerioder
    }
}

export class Sporsmal {
    id: string;
    tag: TagTyper;
    tagIndex?: number;
    overskrift: string;
    sporsmalstekst: string;
    undertekst: string | null;
    svartype: RSSvartype;
    min: string | null;
    max: string | null;
    kriterieForVisningAvUndersporsmal: string;
    svarliste: RSSvarliste;
    undersporsmal: Sporsmal[];
    parentKriterie: RSVisningskriterieType | null;
    erHovedsporsmal: boolean;

    constructor(rsspm: RSSporsmal, kriterie: RSVisningskriterieType | null, erHovedsporsmal: boolean) {
        this.id = rsspm.id
        const orgarr: string[] = rsspm.tag.split('_')
        const numtag: number = parseInt(orgarr.pop() as any)
        let tag = rsspm.tag
        if (!isNaN(numtag)) {
            this.tagIndex = numtag
            tag = orgarr.join('_')
        }
        const idtag = tag as keyof typeof TagTyper
        this.tag = TagTyper[idtag]
        this.overskrift = rsspm.overskrift === null ? '' : rsspm.overskrift
        this.sporsmalstekst = rsspm.sporsmalstekst === null ? '' : rsspm.sporsmalstekst
        this.undertekst = rsspm.undertekst
        this.svartype = rsspm.svartype as any as RSSvartype
        this.min = rsspm.min
        this.max = rsspm.max
        this.kriterieForVisningAvUndersporsmal = rsspm.kriterieForVisningAvUndersporsmal as any
        this.svarliste = { sporsmalId: rsspm.id, svar: rsspm.svar }
        this.undersporsmal = rsToSporsmal(rsspm.undersporsmal, rsspm.kriterieForVisningAvUndersporsmal, false)
        this.parentKriterie = kriterie
        this.erHovedsporsmal = erHovedsporsmal
    }
}

const rsToSporsmal = (spms: RSSporsmal[], kriterie: RSVisningskriterieType | null, erHovedsporsmal: boolean) => {
    const sporsmals: Sporsmal[] = []
    if (spms === undefined) {
        return sporsmals
    }
    spms.forEach(rssp => {
        const spm: Sporsmal = new Sporsmal(rssp, kriterie, erHovedsporsmal)
        sporsmals.push(spm)
    })

    if (sporsmals.length >= 2
        && sporsmals[sporsmals.length - 1].tag === TagTyper.VAER_KLAR_OVER_AT
        && sporsmals[sporsmals.length - 2].tag === TagTyper.BEKREFT_OPPLYSNINGER) {
        // Det finnes tilfeller opprettet i db før 15 Mai 2020 hvor disse er i "feil rekkefølge" Dette fikser sorteringa
        // Se også https://github.com/navikt/syfosoknad/commit/1983d32f3a7fb28bbf17126ea227d91589ad5f35
        const tmp = sporsmals[sporsmals.length - 1]
        sporsmals[sporsmals.length - 1] = sporsmals[sporsmals.length - 2]
        sporsmals[sporsmals.length - 2] = tmp
    }
    return sporsmals
}
