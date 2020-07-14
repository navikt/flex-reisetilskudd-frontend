import React, { ReactElement } from 'react';
import Lenke from 'nav-frontend-lenker';
import Chevron from 'nav-frontend-chevron';
import { Normaltekst } from 'nav-frontend-typografi';

function TilbakeKnapp(): ReactElement {
  return (
    <div className="tilbakeKnapp">
      <Normaltekst>
        <Lenke href="#">
          <Chevron type="venstre" />
          <span>Tilbake</span>
        </Lenke>
      </Normaltekst>
    </div>
  );
}

export default TilbakeKnapp;
