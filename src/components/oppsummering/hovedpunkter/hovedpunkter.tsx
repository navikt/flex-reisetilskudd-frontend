import './hovedpunkter.less'

import dayjs from 'dayjs'
import { Knapp } from 'nav-frontend-knapper'
import Lenke from 'nav-frontend-lenker'
import Lukknapp from 'nav-frontend-lukknapp'
import { BekreftCheckboksPanel } from 'nav-frontend-skjema'
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { useAppStore } from '../../../data/stores/app-store'
import { getLedetekst, tekst } from '../../../utils/tekster'
import Vis from '../../diverse/vis'

const Hovedpunkter = () => {
    const { valgtReisetilskudd, erBekreftet, setErBekreftet } = useAppStore()
    const history = useHistory()
    const plikterRef = useRef<HTMLDivElement>(null)

    const fom = dayjs(valgtReisetilskudd!.fom)
    const tom = dayjs(valgtReisetilskudd!.tom)
    const sameYear = fom.year() === tom.year()
    const bilag = valgtReisetilskudd!.kvitteringer

    const visPlikter = () => {
        plikterRef.current!.classList.add('aktiv')
        document.body.classList.add('vismodal')
    }

    const skjulPlikter = () => {
        plikterRef.current!.classList.remove('aktiv')
        document.body.classList.remove('vismodal')
    }

    return (
        <section className="hovedpunkter">
            <Undertittel className="avsnitt" tag="h2">{tekst('hovedpunkter.tittel.bekreft')}</Undertittel>
            <Normaltekst>{tekst('hovedpunkter.ingress')}</Normaltekst>

            <Element className="avsnitt" tag="h3">{tekst('hovedpunkter.tittel')}</Element>
            <Normaltekst tag="ul" className="punkter">
                <li>
                    {getLedetekst(tekst('hovedpunkter.fra_til'), {
                        '%FRA%': sameYear ? fom.format('DD.') : fom.format('DD. MMM YYYY'),
                        '%TIL%': tom.format('DD. MMM YYYY')
                    })}
                </li>

                <Vis hvis={valgtReisetilskudd!.orgNavn !== undefined}>
                    <li>{tekst('hovedpunkter.arbeidsgiver_betaler')}</li>
                </Vis>

                <Vis hvis={valgtReisetilskudd!.kvitteringer.length > 0}>
                    <li>
                        {getLedetekst(tekst('hovedpunkter.kvitteringer'), {
                            '%ANTALL%': bilag.length,
                            '%SUM%': bilag.reduce((acc, b) => acc + b.belop!, 0)
                        })}
                    </li>
                </Vis>
            </Normaltekst>

            <BekreftCheckboksPanel label="" checked={erBekreftet}
                onChange={(e: any) => setErBekreftet(e.target.checked)}
            >
                {tekst('hovedpunkter.bekreft.tekst')}
                <button className="vis_plikter" onClick={visPlikter}>{tekst('hovedpunkter.bekreft.lenke')}</button>
                .
            </BekreftCheckboksPanel>

            <div className="knapperad">
                <Knapp type="hoved" onClick={() => history.push('/bekreftelse')} disabled={!erBekreftet}>
                    {tekst('klikkbar.send-knapp.tekst')}
                </Knapp>
            </div>

            <div ref={plikterRef} className="plikter_bakgrunn">
                <div className="plikter">
                    <Lukknapp onClick={skjulPlikter}>Lukk</Lukknapp>
                    <Undertittel className="avsnitt">{tekst('hovedpunkter.plikter.tittel')}</Undertittel>
                    <Normaltekst>
                        {tekst('hovedpunkter.plikter.tilskudd')}
                        <Lenke href={'hovedpunkter.plikter.tilskudd.url'} target="_blank">
                            {tekst('hovedpunkter.plikter.tilskudd.lenke')}
                        </Lenke>.
                    </Normaltekst>
                    <Element className="avsnitt">{tekst('hovedpunkter.plikter.viktig')}</Element>
                    <Normaltekst tag="ul" className="punkter">
                        <li>{tekst('hovedpunkter.plikter.punkter.punkt1')}</li>
                        <li>{tekst('hovedpunkter.plikter.punkter.punkt2')}</li>
                        <li>{tekst('hovedpunkter.plikter.punkter.punkt3')}</li>
                        <li>{tekst('hovedpunkter.plikter.punkter.punkt4')}</li>
                        <li>{tekst('hovedpunkter.plikter.punkter.punkt5')}</li>
                    </Normaltekst>

                    <div className="knapperad">
                        <Knapp type="standard" onClick={skjulPlikter}>OK</Knapp>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hovedpunkter
