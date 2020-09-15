import './dine-reisetilskudd.less'

import { HoyreChevron } from 'nav-frontend-chevron'
import { Element, Systemtittel } from 'nav-frontend-typografi'
import React from 'react'
import { Link } from 'react-router-dom'

import { SøknadsIkon } from '../../assets/ikoner'
import { Reisetilskudd } from '../../types/reisetilskudd'
import { DatoFormat, formatertDato } from '../../utils/dato'
import { getLedetekst, tekst } from '../../utils/tekster'
import Vis from '../vis'
import useReisetilskuddTilGlobalState from './useReisetilskuddTilGlobalState'

interface Props {
    reisetilskudd: Reisetilskudd,
}

const DineReisetilskudd = ({ reisetilskudd }: Props) => {
    const settReisetilskuddTilGlobalState = useReisetilskuddTilGlobalState()

    return (
        <Link to={`/soknaden/${reisetilskudd.reisetilskuddId}/1`}
            className="dine-reisetilskudd"
            onClick={() => settReisetilskuddTilGlobalState(reisetilskudd)}
        >
            <div className="reisetilskudd-ikon">
                <SøknadsIkon />
            </div>
            <div className="reisetilskudd-innhold">
                <Systemtittel className="reisetilskudd-innhold-tittel">
                    {tekst('dine_reisetilskudd.tittel')}
                </Systemtittel>
                <Vis hvis={reisetilskudd.fom && reisetilskudd.tom}>
                    <Element className="reisetilskudd-periode">
                        {getLedetekst(tekst('dine_reisetilskudd.periode'), {
                            '%FOM%': reisetilskudd.fom ? formatertDato(reisetilskudd.fom, DatoFormat.NATURLIG_LANG) : '',
                            '%TOM%': reisetilskudd.tom ? formatertDato(reisetilskudd.tom, DatoFormat.NATURLIG_LANG) : ''
                        })}
                    </Element>
                </Vis>
                <Element className="reisetilskudd-orgnavn">
                    {getLedetekst(tekst('dine_reisetilskudd.org'), {
                        '%ORGNAVN%': reisetilskudd.orgNavn,
                        '%ORGNUMMER%': reisetilskudd.orgNummer
                    })}
                </Element>
            </div>
            <HoyreChevron className="reisetilskudd-chevron" />
        </Link>
    )
}

export default DineReisetilskudd
