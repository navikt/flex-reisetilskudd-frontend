import React, { ReactElement } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { useHistory } from 'react-router-dom';
import { getAntallSider } from '../../constants/sideTitler';
import { pathTilSide } from '../../utils/navigasjon';
import { AktivtStegProps } from '../../types/navigasjonTypes';
import './knapper.less';

function VidereKnapp({ aktivtSteg, valideringsFunksjon } : AktivtStegProps): ReactElement {
  const history = useHistory();

  function gåTilNesteSide() {
    if (
      aktivtSteg + 1 <= getAntallSider()
      && aktivtSteg + 1 > 1
    ) {
      history.push(pathTilSide(aktivtSteg + 1, history));
    }
  }

  function handleClick() {
    if (valideringsFunksjon) {
      const validert = valideringsFunksjon();
      console.log(validert);
      if (validert) {
        gåTilNesteSide();
      }
    }
  }

  return (
    <div className="videre-knapp">
      <Knapp type="hoved" onClick={() => handleClick()}>Gå videre</Knapp>
    </div>
  );
}

export default VidereKnapp;
