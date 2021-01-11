import Vis from './vis'
import { ReisetilskuddStatus } from '../../types/types'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import { getLedetekst, tekst } from '../../utils/tekster'
import dayjs from 'dayjs'
import AlertStripe from 'nav-frontend-alertstriper'
import React from 'react'
import { useAppStore } from '../../data/stores/app-store'

const KanSendesAlertStripe = () => {
    const { valgtReisetilskudd } = useAppStore()

    if (!valgtReisetilskudd) {
        return null
    }

    const alertstripeType = () => {
        if (valgtReisetilskudd?.status === ReisetilskuddStatus.SENDBAR) {
            return 'suksess'
        } else {
            return 'advarsel'
        }
    }

    return (
        <AlertStripe className="kan-sendes" type={alertstripeType()}>
            <Vis hvis={valgtReisetilskudd.status === ReisetilskuddStatus.ÅPEN}>
                <Undertittel>{getLedetekst(tekst('tilskudd.start.alertstripe.tittel'), {
                    '%DATO%': dayjs(valgtReisetilskudd.tom).add(1, 'day').format('DD. MMM YYYY')
                })}</Undertittel>
            </Vis>
            <Normaltekst>{tekst('tilskudd.start.alertstripe.tekst.' + valgtReisetilskudd.status)}</Normaltekst>
        </AlertStripe>
    )
}

export default KanSendesAlertStripe
