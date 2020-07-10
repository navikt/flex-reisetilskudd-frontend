import React, { ReactElement } from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import './kvittering-side.less';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';

function KvitteringSide():ReactElement {
  return (
    <div className="page-wrapper">
      <p>morra di er mann</p>
      <div className="liste-wrapper">
        <div className="tekstwrapper">
          <Normaltekst>
            <Undertittel>Nå har du gjort første del</Undertittel>
            <p>Du har sendt beskjed om sykefraværet til arbeidsgiveren din</p>
            <Undertittel>Du har nå fullført andre del</Undertittel>
            <p>
              <p>
                Kravet ditt om reisetilskudd er nå under behandling.
                Du vil få varsel når dette er klart
              </p>
              <b>Lurer du på hva saksbehandler gjør?</b>
              <p><a href="www.nav.no">Les mer om reglene for reisetilskudd .</a></p>
            </p>
          </Normaltekst>
        </div>
      </div>
      <div className="veien-videre-wrapper">
        <AlertStripe className="gronn-checkbox" type="suksess">
          <Undertittel>Sykemeldingen er sendt til NAV</Undertittel>
          <p>
            Dato sendt:
            {}
            , kl:
            {}
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
    </div>
  );
}

export default KvitteringSide;
