import React, { ReactElement } from 'react';
import RadioSporsmalOffentligPrivat from '../../components/sporsmal/radioSporsmal/RadioSporsmalOffentligPrivat';
import Veileder from '../../components/sporsmal/Veileder';
import DagensTransportmiddelCheckbox from '../../components/sporsmal/dagensTransportmiddelCheckbox/dagensTransportmiddelCheckbox';
import InputSpørsmål from '../../components/sporsmal/inputSpørsmål/InputSpørsmål';
import Vis from '../../components/Vis';
import {
  offentligPrivatSpørsmål, transportalternativerPrivat,
  antallKilometerSpørsmål, månedligeUtgifterSpørsmål, transportVeileder,
} from '../../components/sporsmal/spørsmålTekster';
import { useAppStore } from '../../data/stores/app-store';

const DagensTransportmiddel = (): ReactElement => {
  const { activeOffentligPrivat, dagensTransportmiddelState } = useAppStore();

  return (
    <>
      {Veileder(transportVeileder)}
      {RadioSporsmalOffentligPrivat(offentligPrivatSpørsmål)}
      <Vis hvis={activeOffentligPrivat === 'OFFENTLIG'}>
        {InputSpørsmål(månedligeUtgifterSpørsmål)}
      </Vis>
      <Vis hvis={activeOffentligPrivat === 'PRIVAT'}>
        {DagensTransportmiddelCheckbox(transportalternativerPrivat)}
        <Vis hvis={dagensTransportmiddelState.transportalternativerPrivat.egenBilChecked === true}>
          {InputSpørsmål(antallKilometerSpørsmål)}
        </Vis>
      </Vis>
    </>
  );
};

export default DagensTransportmiddel;
