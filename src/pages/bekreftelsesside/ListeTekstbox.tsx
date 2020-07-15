import React, { ReactElement } from 'react';
import './bekreftelsesside.less';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';

function ListeTekstbox():ReactElement {
  return (
    <div className="liste-wrapper">
      <div className="tekstwrapper">
        <Normaltekst>
          <div className="inline-container">
            <div className="numberCircle">1</div>
            {' '}
            <span />
            <div>
              <Undertittel>Nå har du gjort første del</Undertittel>
              <p>Du har sendt beskjed om sykefraværet til arbeidsgiveren din</p>
            </div>
          </div>

          <div className="inline-container">
            <div className="numberCircle">2</div>
            <span />
            <div>
              <Undertittel>Du har nå fullført andre del</Undertittel>
              <p>
                <p>
                  Kravet ditt om reisetilskudd er nå under behandling.
                  Du vil få varsel når dette er klart
                </p>
                <b>Lurer du på hva saksbehandler gjør?</b>
                <p><a href="www.nav.no">Les mer om reglene for reisetilskudd .</a></p>
              </p>
            </div>
          </div>
        </Normaltekst>
      </div>
    </div>
  );
}

export default ListeTekstbox;
