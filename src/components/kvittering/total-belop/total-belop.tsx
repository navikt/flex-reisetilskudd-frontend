import { Normaltekst } from 'nav-frontend-typografi'
import React, { ReactElement } from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { getLedetekst, tekst } from '../../../utils/tekster'

const TotalBelop = (): ReactElement => {
    const { valgtReisetilskudd } = useAppStore()

    const totaltBeløp = (): number => (valgtReisetilskudd!.kvitteringer
        ? valgtReisetilskudd!.kvitteringer
            .filter((kvittering) => kvittering.belop)
            .map((kvittering) => kvittering.belop!)
            .reduce((a, b) => a + b, 0.0)
        : (0.0))

    return (
        <Normaltekst>
            {getLedetekst(tekst('total_belop.totalbelop'), {
                '%TOTALBELOP%': totaltBeløp().toFixed(2)
            })}
        </Normaltekst>
    )
}

export default TotalBelop
