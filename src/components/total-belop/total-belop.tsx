import { Normaltekst } from 'nav-frontend-typografi'
import React, { ReactElement } from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { getLedetekst, tekst } from '../../utils/tekster'
import { nf_des } from '../../utils/utils'

const TotalBelop = (): ReactElement => {
    const { valgtReisetilskudd } = useAppStore()

    const totaltBeløp = (): number => (valgtReisetilskudd!.kvitteringer
        ? valgtReisetilskudd!.kvitteringer
            .filter((kvittering) => kvittering.belop)
            .map((kvittering) => kvittering.belop!)
            .reduce((a, b) => a + b, 0.0)
        : (0.0))

    return (
        <Normaltekst className="kvitteringer-total">
            {getLedetekst(tekst('total_belop.totalbelop'), {
                '%TOTALBELOP%': nf_des.format(totaltBeløp())    // TODO: Tror ikke denne funker
            })}
        </Normaltekst>
    )
}

export default TotalBelop
