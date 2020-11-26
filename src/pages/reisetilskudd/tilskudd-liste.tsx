import './tilskudd-liste.less'

import { HoyreChevron } from 'nav-frontend-chevron'
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import Banner from '../../components/diverse/banner/banner'
import Brodsmuler from '../../components/diverse/brodsmuler/brodsmuler'
import Vis from '../../components/diverse/vis'
import { useAppStore } from '../../data/stores/app-store'
import { Brodsmule } from '../../types'
import { SEPARATOR } from '../../utils/constants'
import { DatoFormat, formatertDato } from '../../utils/dato'
import { getLedetekst, tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import SoknadsIkon from './soknads-ikon.svg'

const brodsmuler: Brodsmule[] = [ {
    tittel: tekst('tilskudd.liste.tittel'),
    sti: SEPARATOR,
    erKlikkbar: false
} ]

const TilskuddListe = () => {
    const { reisetilskuddene } = useAppStore()

    useEffect(() => {
        setBodyClass('reisetilskudd-liste')
    }, [])

    return (
        <>
            <Banner tittel={tekst('tilskudd.liste.tittel')} />
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <Vis hvis={reisetilskuddene && reisetilskuddene.length < 1}>
                    <Normaltekst>
                        {tekst('tilskudd.liste.ingen.reisetilskudd1')}
                        <Link to={tekst('tilskudd.liste.ingen.reisetilskudd.url')}>
                            {tekst('tilskudd.liste.ingen.lenke')}
                        </Link>
                        {tekst('tilskudd.liste.ingen.reisetilskudd2')}
                    </Normaltekst>
                </Vis>

                <Vis hvis={reisetilskuddene}>
                    <Element tag="h2" className="nye-soknader__tittel">
                        {tekst('tilskudd.liste.nye.soknader')}
                    </Element>

                    {reisetilskuddene?.map((tilskudd, idx) => {
                        return (
                            <Link to={`/soknaden/${tilskudd.reisetilskuddId}/1`}
                                className="dine-reisetilskudd" key={idx}
                            >
                                <div className="reisetilskudd-ikon">
                                    <img src={SoknadsIkon} alt="" />
                                </div>
                                <div className="reisetilskudd-innhold">
                                    <Systemtittel className="reisetilskudd-innhold-tittel">
                                        {tekst('dine.tilskudd.tittel')}
                                    </Systemtittel>
                                    <Vis hvis={tilskudd.fom && tilskudd.tom}>
                                        <Element className="reisetilskudd-periode">
                                            {getLedetekst(tekst('dine.tilskudd.periode'), {
                                                '%FOM%': tilskudd.fom ? formatertDato(tilskudd.fom, DatoFormat.NATURLIG_LANG) : '',
                                                '%TOM%': tilskudd.tom ? formatertDato(tilskudd.tom, DatoFormat.NATURLIG_LANG) : ''
                                            })}
                                        </Element>
                                    </Vis>
                                    <Element className="reisetilskudd-orgnavn">
                                        {getLedetekst(tekst('dine.tilskudd.org'), {
                                            '%ORGNAVN%': tilskudd.orgNavn,
                                            '%ORGNUMMER%': tilskudd.orgNummer
                                        })}
                                    </Element>
                                </div>
                                <HoyreChevron className="reisetilskudd-chevron" />
                            </Link>
                        )
                    })}
                </Vis>

                <Vis hvis={reisetilskuddene === undefined}>
                    <Normaltekst>{tekst('tilskudd.liste.feilmelding')}</Normaltekst>
                </Vis>
            </div>
        </>
    )
}

export default TilskuddListe
