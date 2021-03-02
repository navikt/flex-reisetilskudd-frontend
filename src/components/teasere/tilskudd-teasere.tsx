import './tilskudd-teasere.less'

import { HoyreChevron } from 'nav-frontend-chevron'
import Etikett from 'nav-frontend-etiketter'
import { Select } from 'nav-frontend-skjema'
import { Normaltekst, Undertekst, Undertittel } from 'nav-frontend-typografi'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAppStore } from '../../data/stores/app-store'
import { Reisetilskudd } from '../../types/types'
import { tilLesbarDatoMedArstall, tilLesbarPeriodeMedArstall } from '../../utils/dato'
import { getLedetekst, tekst } from '../../utils/tekster'
import Vis from '../diverse/vis'
import OmReisetilskudd from './om-reisetilskudd/om-reisetilskudd'
import SoknadHoverIkon from './soknad-hover-ikon.svg'
import SoknadIkon from './soknad-ikon.svg'
import { getUrlTilSoknad } from '../../utils/utils'
import dayjs from 'dayjs'

enum Sortering {
    Dato = 'Dato',
    Status = 'Status',
    Sendt = 'Sendt',
}


const TilskuddTeasere = () => {
    const { reisetilskuddene } = useAppStore()
    const [ sortering, setSortering ] = useState<Sortering>(Sortering.Dato)

    const sorterteSoknader = () => {
        if (sortering === Sortering.Dato) {
            return reisetilskuddene.sort((a, b) => dayjs(b.tom).diff(a.tom))    // TODO: test at denne funker
        } else if (sortering === Sortering.Status) {
            return reisetilskuddene.sort((a, b) => a.status.localeCompare(b.status))
        } else if (sortering === Sortering.Sendt) {
            return reisetilskuddene.sort((a, b) => {
                return (dayjs(b.sendt).toDate().getTime() || dayjs(b.avbrutt).toDate().getTime() || 0)
                    - (dayjs(a.sendt).toDate().getTime() || dayjs(a.avbrutt).toDate().getTime() || 0)
            })
        }
        return reisetilskuddene
    }

    function harBesvart(reisetilskudd: Reisetilskudd): boolean {
        return reisetilskudd.sporsmal.some(s => s.svarliste.svar.length > 0)
    }

    type kategori = 'NYE' | 'PÅBEGYNTE' | 'TIDLIGERE'

    function hovedkategori(reisetilskudd: Reisetilskudd): kategori {
        switch (reisetilskudd.status) {
            case 'FREMTIDIG':
            case 'ÅPEN':
                return 'NYE'
            case 'PÅBEGYNT':
                return 'PÅBEGYNTE'
            case 'SENDBAR': {
                if (harBesvart(reisetilskudd)) {
                    return 'PÅBEGYNTE'
                } else {
                    return 'NYE'
                }
            }
        }
        return 'TIDLIGERE'
    }

    const nyeTilskudd = reisetilskuddene.filter(r => {
        return hovedkategori(r) === 'NYE'
    })

    const påbegynte = reisetilskuddene.filter(r => {
        return hovedkategori(r) === 'PÅBEGYNTE'

    })

    const tidligere = reisetilskuddene.filter(r => {
        return hovedkategori(r) === 'TIDLIGERE'
    })

    return (
        <div className="tilskudd__teasere">
            <Vis hvis={nyeTilskudd.length > 0}>

                <div className="tilskudd--nye">
                    <Undertittel tag="h2" className="tilskudd__tittel">
                        {tekst('tilskudd.liste.nye.soknader')}
                    </Undertittel>
                    {nyeTilskudd.map((tilskudd, idx) => {
                        return <Teaser tilskudd={tilskudd} key={idx} />
                    })}
                </div>
            </Vis>

            <Vis hvis={påbegynte.length > 0}>

                <div className="tilskudd--pabegynt">
                    <Undertittel tag="h2" className="tilskudd__tittel">
                        {tekst('tilskudd.liste.usendte.soknader')}
                    </Undertittel>

                    {påbegynte.map((tilskudd, idx) => {
                        return <Teaser tilskudd={tilskudd} key={idx} />
                    })}
                </div>
            </Vis>


            <OmReisetilskudd />

            <Vis hvis={tidligere.length > 0}>

                <div className="tilskudd--tidligere">
                    <Vis hvis={sorterteSoknader().length > 0}>
                        <Select label="Sorter etter" className="teasere__sortering"
                            onChange={(event) => setSortering(event.target.value as Sortering)}
                        >
                            {Object.values(Sortering).map((sort, idx) => {
                                return <option value={sort} key={idx}>{sort}</option>
                            })}
                        </Select>
                    </Vis>

                    <Undertittel tag="h2" className="tilskudd__tittel">
                        {tekst('tilskudd.liste.sendte.soknader')}
                    </Undertittel>

                    {tidligere.map((tilskudd, idx) => {
                        return <Teaser tilskudd={tilskudd} key={idx} />
                    })}
                </div>
            </Vis>

        </div>
    )
}

export default TilskuddTeasere


interface TeaserProps {
    tilskudd: Reisetilskudd;
}

const Teaser = ({ tilskudd }: TeaserProps) => {
    const linkRef = useRef<HTMLAnchorElement>(null)

    const aktiveringsdato = dayjs(tilskudd.tom).add(1, 'day')

    const teaserInnhold = <div className="teaser__ytre">
        <div className="ytre__del1">
            <span className="tilskudd__ikon">
                <img src={SoknadIkon} className="tilskudd__img" alt="" />
                <img src={SoknadHoverIkon} className="tilskudd__img--hover" alt="" />
            </span>
            <div className="tilskudd-innhold">
                <Vis hvis={tilskudd.fom && tilskudd.tom}>
                    <Undertekst className="inngangspanel__periode">
                        {tilLesbarPeriodeMedArstall(tilskudd.fom, tilskudd.tom)}
                    </Undertekst>
                </Vis>
                <Undertittel className="teaser__tittel">
                    {tekst('dine.tilskudd.tittel')}
                </Undertittel>
                <Vis hvis={tilskudd.status === 'ÅPEN' || tilskudd.status === 'PÅBEGYNT'}>
                    <Normaltekst>
                        {getLedetekst(tekst('dine.tilskudd.kansendes'), { '%DATO%': tilLesbarDatoMedArstall(aktiveringsdato) })}
                    </Normaltekst>
                </Vis>
                <Vis hvis={tilskudd.status === 'SENDBAR'}>
                    <Normaltekst>
                        {tekst('dine.tilskudd.kansendes.sendbar')}
                    </Normaltekst>
                </Vis>
                <Vis hvis={tilskudd.status === 'SENDT' && tilskudd.arbeidsgiverNavn}>
                    <Normaltekst>
                        {getLedetekst(tekst('dine.tilskudd.reise.til'), { '%ARBEIDSGIVER%': tilskudd.arbeidsgiverNavn })}
                    </Normaltekst>
                </Vis>
            </div>
        </div>
        <StatusEtikett tilskudd={tilskudd} />
    </div>

    if (tilskudd.status === 'FREMTIDIG') {
        return (
            <div id={tilskudd.id} className="dine-reisetilskudd">
                {teaserInnhold}
            </div>
        )
    }

    return (
        <Link ref={linkRef} to={getUrlTilSoknad(tilskudd)}
            className="dine-reisetilskudd dine-reisetilskudd-hoverbar">
            {teaserInnhold}
            <HoyreChevron className="tilskudd-chevron" />
        </Link>
    )
}

interface StatusEtikettProps {
    tilskudd: Reisetilskudd
}

const StatusEtikett = (props: StatusEtikettProps) => {
    const { tilskudd } = props

    const etikettType = () => {
        switch (tilskudd.status) {
            case 'AVBRUTT':
                return 'info'
            case 'ÅPEN':
                return 'info'
            case 'SENDT':
                return 'suksess'
            default:
                return 'info'
        }
    }

    const etikettTekst = () => {
        switch (tilskudd.status) {
            case 'AVBRUTT':
                return 'Avbrutt'
            case 'SENDT':
                return 'Sendt til NAV'
            case 'ÅPEN':
                return 'Klar til utfylling'
            case 'FREMTIDIG':
                return getLedetekst(
                    tekst('tilskudd.liste.aktiveres'),
                    { '%DATO%': tilLesbarDatoMedArstall(tilskudd.fom) }
                )
        }
    }

    const etikettTeksten = etikettTekst()
    if (!etikettTeksten) {
        return null
    }
    return (
        <Etikett mini type={etikettType()}>{etikettTeksten}</Etikett>
    )
}
