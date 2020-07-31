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
              <Undertittel>Du har sendt inn søknaden</Undertittel>
            </div>
          </div>

          <div className="inline-container">
            <div className="numberCircle">2</div>
            <span />
            <div>
              <Undertittel>Søknaden blir behandlet</Undertittel>
              <p>
                <p>
                  Arbeidsgiveren din dekker utgiftene til reise de første 16 dagene.
                  Deretter er det NAV som utbetaler pengene hvis du har krav på reisetilskudd.
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
