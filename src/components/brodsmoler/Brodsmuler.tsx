import React, { ReactElement } from 'react';
import Stegindikator from 'nav-frontend-stegindikator';
import { useHistory } from 'react-router-dom';
import { sideTitler } from '../../constants/sideTitler';
import { SEPARATOR } from '../../utils/constants';
import { AktivtStegProps } from '../../models/navigasjon';
import './brodsmoler.less';

export const pathUtenSteg = (pathname: string) : string => {
  const arr: string[] = pathname.split(SEPARATOR);
  arr.pop();
  return arr.join(SEPARATOR);
};

function Brodsmuler({ aktivtSteg } : AktivtStegProps) : ReactElement {
  const genererteSteg = Object.entries(sideTitler).map(([, verdi], index) => ({ label: `${verdi}`, index }));
  const history = useHistory();

  function goTo(idx: number) {
    history.push(pathUtenSteg(history.location.pathname) + SEPARATOR + (idx));
  }

  return (
    <Stegindikator
      steg={genererteSteg}
      onChange={(id) => {
        goTo(id + 1);
      }}
      aktivtSteg={aktivtSteg - 1}
      visLabel
      autoResponsiv
    />
  );
}

export default Brodsmuler;
