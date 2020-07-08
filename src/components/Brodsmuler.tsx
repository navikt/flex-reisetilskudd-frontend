import React, { ReactElement } from 'react';
import Stegindikator from 'nav-frontend-stegindikator';
import { sideHjelpetekster } from '../constants/sideIDKonstanter';

type Brodsmuleprops = {aktivtSteg: string};

function Brodsmuler({ aktivtSteg } : Brodsmuleprops) : ReactElement {
  const generteSteg = Object.entries(sideHjelpetekster).map(([nøkkel, verdi], index) => ({ label: `${verdi}`, aktiv: (nøkkel === aktivtSteg), index }));

  return (
    <Stegindikator
      steg={generteSteg}
      onChange={() => {}}
      visLabel
      autoResponsiv
    />
  );
}

export default Brodsmuler;
