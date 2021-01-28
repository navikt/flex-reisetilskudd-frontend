import './hovedpunkter.less'

import dayjs from 'dayjs'
import { Knapp } from 'nav-frontend-knapper'
import Lenke from 'nav-frontend-lenker'
import Modal from 'nav-frontend-modal'
import { BekreftCheckboksPanel } from 'nav-frontend-skjema'
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useAppStore } from '../../../data/stores/app-store'
import { getLedetekst, tekst } from '../../../utils/tekster'
import Vis from '../../diverse/vis'
import env from '../../../utils/environment'
import {
    formatterTall,
    getUrlTilSoknad,
} from '../../../utils/utils'
import { ReisetilskuddStatus } from '../../../types/types'
import AvbrytKnapp from '../../avbryt/avbryt-knapp'
import KanSendesAlertStripe from '../../diverse/kan-sendes-alert-stripe'
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper'
import { post } from '../../../data/fetcher/fetcher'

const Hovedpunkter = () => {
    const { valgtReisetilskudd, reisetilskuddene, setReisetilskuddene } = useAppStore()
    const [ openPlikter, setOpenPlikter ] = useState<boolean>(false)
    const [ erBekreftet, setErBekreftet ] = useState<boolean>(false)
    const [ fetchFeilmelding, setFetchFeilmelding ] = useState<string | null>(null)
    const history = useHistory()

    const fom = dayjs(valgtReisetilskudd!.fom)
    const tom = dayjs(valgtReisetilskudd!.tom)
    const sameYear = fom.year() === tom.year()
    const bilag = valgtReisetilskudd!.kvitteringer

    const sendSoknad = async() => {
        if (!valgtReisetilskudd) {
            return
        }
        if (valgtReisetilskudd.status !== ReisetilskuddStatus.SENDBAR) {
            return
        }

        post(
            `${env.flexGatewayRoot}/flex-reisetilskudd-backend/api/v1/reisetilskudd/${valgtReisetilskudd.id}/send`
        ).then(() => {
            valgtReisetilskudd.sendt = new Date()
            valgtReisetilskudd.status = ReisetilskuddStatus.SENDT
            reisetilskuddene[reisetilskuddene.findIndex(reis => reis.id === valgtReisetilskudd.id)] = valgtReisetilskudd
            setReisetilskuddene(reisetilskuddene)
            history.push(getUrlTilSoknad(valgtReisetilskudd))
        }).catch(() => {
            setFetchFeilmelding('Det skjedde en feil i baksystemene, prøv igjen senere')
        })
    }

    return (
        <>
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
                                '%SUM%': formatterTall(bilag.reduce((acc, b) => acc + b.belop!, 0)/100)
                            })}
                        </li>
                    </Vis>
                </Normaltekst>

                <Vis hvis={valgtReisetilskudd?.status === ReisetilskuddStatus.SENDBAR}>
                    <BekreftCheckboksPanel label="" checked={erBekreftet}
                        onChange={(e: any) => setErBekreftet(e.target.checked)}
                    >
                        {tekst('hovedpunkter.bekreft.tekst')}
                        <button className="lenkeknapp" onClick={() => setOpenPlikter(true)}>
                            {tekst('hovedpunkter.bekreft.lenke')}
                        </button>
                        .
                    </BekreftCheckboksPanel>
                </Vis>

                <Vis hvis={valgtReisetilskudd?.status === ReisetilskuddStatus.ÅPEN}>
                    <KanSendesAlertStripe />
                </Vis>

                <Vis hvis={fetchFeilmelding}>
                    <AlertStripeAdvarsel>
                        <Normaltekst>{fetchFeilmelding}</Normaltekst>
                    </AlertStripeAdvarsel>
                </Vis>

                <div className="knapperad">
                    <Knapp type="hoved" onClick={async() => await sendSoknad()} disabled={!erBekreftet}>
                        {tekst('hovedpunkter.send-knapp.tekst')}
                    </Knapp>
                    <AvbrytKnapp />
                </div>
            </section>

            <Modal
                isOpen={openPlikter}
                onRequestClose={() => setOpenPlikter(false)}
                closeButton={true}
                contentLabel="Hovedpunkter plikter"
                shouldCloseOnOverlayClick={true}
            >
                <div className="plikter">
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
                        <Knapp type="standard" onClick={() => setOpenPlikter(false)}>OK</Knapp>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Hovedpunkter
