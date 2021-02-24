import Vis from './vis'
import { Normaltekst, Element } from 'nav-frontend-typografi'
import { getLedetekst, tekst } from '../../utils/tekster'
import dayjs from 'dayjs'
import Alertstripe from 'nav-frontend-alertstriper'
import React from 'react'
import { useAppStore } from '../../data/stores/app-store'

const KanSendesAlertstripe = () => {
    const { valgtReisetilskudd } = useAppStore()

    if (!valgtReisetilskudd) {
        return null
    }

    const alertstripeType = () => {
        if (valgtReisetilskudd?.status === 'SENDBAR') {
            return 'suksess'
        } else {
            return 'advarsel'
        }
    }

    return (
        <Alertstripe className="kan-sendes" type={alertstripeType()}>
            <Vis hvis={valgtReisetilskudd.status === 'ÅPEN' || valgtReisetilskudd.status === 'PÅBEGYNT'}>
                <Element>{getLedetekst(tekst('tilskudd.start.alertstripe.tittel'), {
                    '%DATO%': dayjs(valgtReisetilskudd.tom).add(1, 'day').format('DD. MMM YYYY')
                })}</Element>
            </Vis>
            <Normaltekst>{tekst(`tilskudd.start.alertstripe.tekst.${valgtReisetilskudd.status}` as any)}</Normaltekst>
        </Alertstripe>
    )
}

export default KanSendesAlertstripe
