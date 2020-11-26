import './hovedpunkter.less'

import dayjs from 'dayjs'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { getLedetekst, tekst } from '../../../utils/tekster'
import Vis from '../../diverse/vis'

const Hovedpunkter = () => {
    const { valgtReisetilskudd } = useAppStore()

    const fom = dayjs(valgtReisetilskudd!.fom)
    const tom = dayjs(valgtReisetilskudd!.tom)
    const sameYear = fom.year() === tom.year()
    const bilag = valgtReisetilskudd!.kvitteringer

    return (
        <section className="hovedpunkter">
            <Element tag="h2">{tekst('hovedpunkter.tittel')}</Element>

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
        </section>
    )
}

export default Hovedpunkter
