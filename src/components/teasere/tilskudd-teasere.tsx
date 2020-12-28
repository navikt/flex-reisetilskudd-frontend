import './tilskudd-teasere.less'

import { HoyreChevron } from 'nav-frontend-chevron'
import Etikett from 'nav-frontend-etiketter'
import { Select } from 'nav-frontend-skjema'
import { Normaltekst, Undertekst, Undertittel } from 'nav-frontend-typografi'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAppStore } from '../../data/stores/app-store'
import { Reisetilskudd, ReisetilskuddStatus } from '../../types/types'
import { tilLesbarPeriodeMedArstall } from '../../utils/dato'
import { tekst } from '../../utils/tekster'
import Vis from '../diverse/vis'
import OmReisetilskudd from './om-reisetilskudd/om-reisetilskudd'
import SoknadHoverIkon from './soknad-hover-ikon.svg'
import SoknadIkon from './soknad-ikon.svg'

enum Sortering {
    Dato = 'Dato',
    Status = 'Status',
    Sendt = 'Sendt',
}

const TilskuddTeasere = () => {
    const { reisetilskuddene } = useAppStore()
    const [ sortering, setSortering ] = useState<Sortering>(Sortering.Dato)

    const sorterteSoknader = () => {
        // TODO: Fix sortering
        if (sortering === Sortering.Dato) {
            return reisetilskuddene.sort()
        } else if (sortering === Sortering.Status) {
            return reisetilskuddene.sort()
        } else if (sortering === Sortering.Sendt) {
            return reisetilskuddene.sort()
        }
        return reisetilskuddene
    }

    const usendteTilskudd = reisetilskuddene.filter(r => r.status === ReisetilskuddStatus.FREMTIDIG || r.status === ReisetilskuddStatus.ÅPEN)
    const sendteTilskudd = reisetilskuddene.filter(r => r.status === ReisetilskuddStatus.SENDT || r.status === ReisetilskuddStatus.AVBRUTT)

    return (
        <div className="tilskudd__teasere">
            <div className="tilskudd--usendt">
                <Undertittel tag="h2" className="tilskudd__tittel">
                    {tekst('tilskudd.liste.usendte.soknader')}
                </Undertittel>
                <Vis hvis={usendteTilskudd.length === 0}>
                    <Normaltekst>{tekst('tilskudd.liste.ingen.nye')}</Normaltekst>
                </Vis>
                <Vis hvis={usendteTilskudd.length > 0}>
                    {usendteTilskudd.map((tilskudd, idx) => {
                        return <Teaser tilskudd={tilskudd} key={idx} />
                    })}
                </Vis>
            </div>

            <OmReisetilskudd />

            <div className="tilskudd--sendt">
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

    return (
        <Link ref={linkRef} to={`/soknadstart/${tilskudd.reisetilskuddId}/1`}
            className="dine-reisetilskudd" key={key}
        >
            <div className="teaser__ytre">
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
            <HoyreChevron className="tilskudd-chevron" />
        </Link>
    )
}

const StatusEtikett = (props: any) => {
    const { tilskudd } = props

    const etikettType = () => {
        if (tilskudd.status === ReisetilskuddStatus.AVBRUTT) {
            return 'info'
        }
        if (tilskudd.status === ReisetilskuddStatus.FREMTIDIG) {
            return 'info'
        }
        if (tilskudd.status === ReisetilskuddStatus.SENDT) {
            return 'suksess'
        }
        if (tilskudd.status === ReisetilskuddStatus.ÅPEN) {
            return 'suksess'
        }
        return 'info'
    }

    const etikettTekst = () => {
        if (tilskudd.status === ReisetilskuddStatus.AVBRUTT) {
            return 'Avbrutt'
        }
        if (tilskudd.status === ReisetilskuddStatus.SENDT) {
            return 'Sendt til NAV'
        }
        if (tilskudd.status === ReisetilskuddStatus.ÅPEN) {
            return 'Klar til innsending'
        }
        if (tilskudd.status === ReisetilskuddStatus.FREMTIDIG) {
            return 'Klar til utfylling'
        }
        return 'Klar til utfylling'
    }

    return (
        <Etikett mini type={etikettType()}>{etikettTekst()}</Etikett>
    )
}
