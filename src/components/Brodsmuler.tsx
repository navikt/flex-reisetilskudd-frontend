import React, { ReactElement } from 'react';
import Stegindikator from 'nav-frontend-stegindikator';
import { useHistory } from 'react-router-dom';
import { sideHjelpetekster } from '../constants/sideIDKonstanter';
import { SEPARATOR } from '../utils/constants';

type Brodsmuleprops = {aktivtSteg: string};

export const pathUtenSteg = (pathname: string) : string => {
  const arr: string[] = pathname.split(SEPARATOR);
  arr.pop();
  return arr.join(SEPARATOR);
};

function Brodsmuler({ aktivtSteg } : Brodsmuleprops) : ReactElement {
  const generteSteg = Object.entries(sideHjelpetekster).map(([nøkkel, verdi], index) => ({ label: `${verdi}`, aktiv: (nøkkel === aktivtSteg), index }));
  const history = useHistory();

  function goTo(idx: number) {
    history.push(pathUtenSteg(history.location.pathname) + SEPARATOR + (idx));
  }

  return (
    <Stegindikator
      steg={generteSteg}
      onChange={(id) => {
        goTo(id + 1);
      }}
      visLabel
      autoResponsiv
    />
  );
}

export default Brodsmuler;
