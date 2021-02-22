import './tilskudd-teasere.less'

import { HoyreChevron } from 'nav-frontend-chevron'
import Etikett from 'nav-frontend-etiketter'
import { Select } from 'nav-frontend-skjema'
import { Normaltekst, Undertekst, Undertittel } from 'nav-frontend-typografi'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAppStore } from '../../data/stores/app-store'
import { Reisetilskudd, ReisetilskuddStatus } from '../../types/types'
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

    const nyeTilskudd = reisetilskuddene.filter(r => {
        return r.status === ReisetilskuddStatus.FREMTIDIG
    })

    const usendteTilskudd = reisetilskuddene.filter(r => {
        return r.status === ReisetilskuddStatus.ÅPEN
            || r.status === ReisetilskuddStatus.SENDBAR
    })

    const sendteTilskudd = reisetilskuddene.filter(r => {
        return r.status === ReisetilskuddStatus.SENDT
            || r.status === ReisetilskuddStatus.AVBRUTT
    })

    return (
        <div className="tilskudd__teasere">
            <div className="tilskudd--nye">
                <Undertittel tag="h2" className="tilskudd__tittel">
                    {tekst('tilskudd.liste.nye.soknader')}
                </Undertittel>
                <Vis hvis={nyeTilskudd.length === 0}>
                    <Normaltekst>{tekst('tilskudd.liste.ingen.nye')}</Normaltekst>
                </Vis>
                <Vis hvis={nyeTilskudd.length > 0}>
                    {nyeTilskudd.map((tilskudd, idx) => {
                        return <Teaser tilskudd={tilskudd} key={idx} />
                    })}
                </Vis>
            </div>

            <div className="tilskudd--usendt">
                <Undertittel tag="h2" className="tilskudd__tittel">
                    {tekst('tilskudd.liste.usendte.soknader')}
                </Undertittel>
                <Vis hvis={usendteTilskudd.length === 0}>
                    <Normaltekst>{tekst('tilskudd.liste.ingen.usendte')}</Normaltekst>
                </Vis>
                <Vis hvis={usendteTilskudd.length > 0}>
                    {usendteTilskudd.map((tilskudd, idx) => {
                        return <Teaser tilskudd={tilskudd} key={idx} />
                    })}
                </Vis>
            </div>

            <OmReisetilskudd />

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
                {sendteTilskudd.map((tilskudd, idx) => {
                    return <Teaser tilskudd={tilskudd} key={idx} />
                })}
            </div>
        </div>
    )
}

export default TilskuddTeasere


interface TeaserProps {
    tilskudd: Reisetilskudd;
    key: number;
}

const Teaser = ({ tilskudd, key }: TeaserProps) => {
    const linkRef = useRef<HTMLAnchorElement>(null)

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
                <Normaltekst>
                    {tekst('dine.tilskudd.org')}
                </Normaltekst>
            </div>
        </div>
        <StatusEtikett tilskudd={tilskudd} />
    </div>

    if (tilskudd.status === 'FREMTIDIG') {
        return (
            <div id={tilskudd.id} className="dine-reisetilskudd" key={key}>
                {teaserInnhold}
            </div>
        )
    }

    return (
        <Link ref={linkRef} to={getUrlTilSoknad(tilskudd)}
            className="dine-reisetilskudd" key={key}>
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
            case 'SENDBAR':
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
            case 'SENDBAR':
                return 'Klar til innsending'
            case 'ÅPEN':
                return 'Klar til utfylling'
            case 'FREMTIDIG':
                return getLedetekst(
                    tekst('Aktiveres %DATO%'),
                    { '%DATO%': tilLesbarDatoMedArstall(tilskudd.fom) }
                )
        }
    }

    return (
        <Etikett mini type={etikettType()}>{etikettTekst()}</Etikett>
    )
}
