import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import Vis from '../Vis';
import { pathTilSide, pathUtenSteg } from '../../utils/navigasjon';
import { AktivtStegProps } from '../../types/navigasjonTypes';
import './knapper.less';

function TilbakeKnapp({ aktivtSteg } : AktivtStegProps): ReactElement {
  const history = useHistory();

  function goTo(idx: number) {
    history.push(pathTilSide(idx, history));
  }

  function handleClick() {
    goTo(aktivtSteg - 1);
  }

  return (
    <div className="tilbake-knapp">
      <Vis hvis={aktivtSteg === 1}>
        {/* Hvis vi er på første side i vår søknad og skal gå et annet sted */}
        <Tilbakeknapp onClick={() => history.push(pathUtenSteg('/'))}>
          Tilbake til forside
        </Tilbakeknapp>
      </Vis>
      <Vis hvis={aktivtSteg > 1}>
        <Tilbakeknapp onClick={() => handleClick()}>Tilbake</Tilbakeknapp>
      </Vis>
    </div>
  );
}

export default TilbakeKnapp;
