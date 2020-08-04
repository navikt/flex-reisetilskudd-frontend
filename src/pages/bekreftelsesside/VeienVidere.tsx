import React, { ReactElement } from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import './bekreftelsesside.less';
import { Undertittel } from 'nav-frontend-typografi';
import { DatoFormat, getIDag, getNåTid } from '../../utils/dato';

function VeienVidereBox(): ReactElement {
  return (
    <div className="veien-videre-wrapper">
      <AlertStripe className="gronn-checkbox" type="suksess">
        <Undertittel>Sykmeldingen er sendt til NAV</Undertittel>
        Sendt:
        {' '}
        {getIDag(DatoFormat.NATURLIG_FULL)}
        , kl:
        {' '}
        {getNåTid()}
      </AlertStripe>
      <AlertStripe className="bla-info" type="info">
        <Undertittel>Hva skjer videre?</Undertittel>
        <span className="uthevet-tittel">Du trenger ikke å søke om sykepenger</span>
        <span className="tekstblokk">
          NAV dekker ikke sykepenger de første 16 dagene.
          Dette sykefraværet er kortere, derfor trenger du ikke søke.
        </span>

        <span className="tekstblokk">
          Les gjerne om &nbsp;
          <a href="www.nav.no">sykepenger til selvstendig næringsdrivende og frilansere</a>
        </span>

        <span className="uthevet-tittel">Har du flere jobber?</span>

        <span className="tekstblokk">
          Du må levere én sykmelding per jobb.
          Kontakt den som har sykmeldt deg hvis du trenger flere sykmeldinger.
        </span>
        <span className="tekstblokk">
          <b>Skal du ut og reise?</b>
        </span>
        <a href="www.nav.no">Les om hva du må gjøre for å beholde sykepengene.</a>
      </AlertStripe>
    </div>
  );
}

export default VeienVidereBox;
