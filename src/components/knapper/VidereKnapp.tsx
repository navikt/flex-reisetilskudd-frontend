import React, { ReactElement } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { useHistory } from 'react-router-dom';
import { getAntallSider } from '../../constants/sideTitler';
import { pathTilSide } from '../../utils/navigasjon';
import { AktivtStegProps } from '../../types/navigasjonTypes';
import './knapper.less';

function VidereKnapp({ aktivtSteg } : AktivtStegProps): ReactElement {
  const history = useHistory();

  function goTo(idx: number) {
    history.push(pathTilSide(idx, history));
  }

  function handleClick() {
    if (aktivtSteg + 1 <= getAntallSider() && aktivtSteg + 1 > 1) {
      goTo(aktivtSteg + 1);
    }
  }

  return (
    <div className="videre-knapp">
      <Knapp type="hoved" onClick={() => handleClick()}>Gå videre</Knapp>
    </div>
  );
}

export default VidereKnapp;
