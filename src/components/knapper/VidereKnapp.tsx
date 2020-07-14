import React, { ReactElement } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { useHistory } from 'react-router-dom';
import { getAntallSider } from '../../constants/sideTitler';
import { SEPARATOR } from '../../utils/constants';

type Brodsmuleprops = {aktivtSteg: number};

export const pathUtenSteg = (pathname: string) : string => {
  const arr: string[] = pathname.split(SEPARATOR);
  arr.pop();
  return arr.join(SEPARATOR);
};

function VidereKnapp({ aktivtSteg } : Brodsmuleprops): ReactElement {
  const history = useHistory();

  function goTo(idx: number) {
    history.push(pathUtenSteg(history.location.pathname) + SEPARATOR + (idx));
  }

  function handleClick() {
    if (aktivtSteg + 1 <= getAntallSider() && aktivtSteg + 1 > 1) {
      goTo(aktivtSteg + 1);
    }
  }

  return (
    <div>
      <Knapp type="hoved" onClick={() => handleClick()}>Gå videre</Knapp>
    </div>
  );
}

export default VidereKnapp;
