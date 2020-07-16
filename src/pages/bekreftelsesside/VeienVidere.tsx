import React, { ReactElement } from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import './bekreftelsesside.less';
import { Undertittel } from 'nav-frontend-typografi';
import { DatoFormat, getIDag, getNåTid } from '../../utils/dato';

function VeienVidereBox():ReactElement {
  return (
    <div className="veien-videre-wrapper">
      <AlertStripe className="gronn-checkbox" type="suksess">
        <Undertittel>Sykemeldingen er sendt til NAV</Undertittel>
        <p>
          Sendt:
          {' '}
          {getIDag(DatoFormat.NATURLIG_FULL)}
          , kl:
          {' '}
          {getNåTid()}
        </p>
      </AlertStripe>
      <AlertStripe className="bla-info" type="info">
        <Undertittel>Hva skjer videre?</Undertittel>
        <p>
          <b>Du trenger ikke å søke om sykepenger</b>
          <p>
            NAV dekker ikke sykepenger de første 16 dagene.
            Dette sykefraværet er kortere, derfor trenger du ikke søke.
          </p>
          <p>
            Les gjerne om
            <a href="www.nav.no">sykepenger til selvstendig næringsdrivende og frilansere</a>
          </p>
        </p>
        <p>
          <b>Har du flere jobber?</b>
          <p>
            Du må levere én sykemelding per jobb.
            Kontakt den som har sykemeldt deg hvis du trenger flere sykemeldinger.
          </p>
        </p>
        <p>
          <b>Skal du ut og reise?</b>
          <p><a href="www.nav.no">Les om hva du må gjøre for å beholde sykepengene.</a></p>
        </p>
      </AlertStripe>
    </div>
  );
}

export default VeienVidereBox;
