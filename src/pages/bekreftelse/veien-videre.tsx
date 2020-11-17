import AlertStripe from 'nav-frontend-alertstriper'
import Lenke from 'nav-frontend-lenker'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { DatoFormat, getIDag, getNåTid } from '../../utils/dato'
import { getLedetekst, tekst } from '../../utils/tekster'

const VeienVidere = () => {
    return (
        <>
            <AlertStripe type="suksess">
                <Undertittel>
                    {tekst('bekreft.sendt-til')}
                </Undertittel>
                {getLedetekst(tekst('bekreft.sendt-kl'), {
                    '%DATO': getIDag(DatoFormat.NATURLIG_FULL),
                    '%%KL': getNåTid()
                })}
            </AlertStripe>

            <AlertStripe type="info">
                <Undertittel>Hva skjer videre?</Undertittel>
                <Normaltekst tag="strong">Du trenger ikke å søke om sykepenger</Normaltekst>
                <Normaltekst>
                    NAV dekker ikke sykepenger de første 16 dagene.
                    Dette sykefraværet er kortere, derfor trenger du ikke søke.
                </Normaltekst>

                <Normaltekst>
                    Les gjerne om
                    <Lenke href="www.nav.no">sykepenger til selvstendig næringsdrivende og frilansere</Lenke>
                </Normaltekst>

                <Normaltekst tag="strong">Har du flere jobber?</Normaltekst>

                <Normaltekst>
                    Du må levere én sykmelding per jobb.
                    Kontakt den som har sykmeldt deg hvis du trenger flere sykmeldinger.
                </Normaltekst>
                <Normaltekst>
                    <strong>Skal du ut og reise?</strong>
                </Normaltekst>
                <Normaltekst>
                    <Lenke href="www.nav.no">Les om hva du må gjøre for å beholde sykepengene.</Lenke>
                </Normaltekst>
            </AlertStripe>
        </>
    )
}

export default VeienVidere
