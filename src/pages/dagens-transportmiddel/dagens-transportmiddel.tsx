import React, { ReactElement } from 'react';
import RadioSpørsmål from '../../components/sporsmal/radioSpørsmål/RadioSpørsmål';
import Veileder from '../../components/sporsmal/Veileder';
import CheckboxSpørsmål from '../../components/sporsmal/checkboxSpørsmål/CheckboxSpørsmål';
import InputSpørsmål from '../../components/sporsmal/inputSpørsmål/InputSpørsmål';
import Vis from '../../components/Vis';
import {
  offentligPrivatSpørsmål, transportAlternativerPrivat,
  antallKilometerSpørsmål, månedligeUtgifterSpørsmål, transportVeileder,
} from '../../components/sporsmal/spørsmålTekster';
import { useAppStore } from '../../data/stores/app-store';

const DagensTransportmiddel = (): ReactElement => {
  const { activeOffentligPrivat } = useAppStore();

  return (
    <>
      {RadioSpørsmål(offentligPrivatSpørsmål)}
      {Veileder(transportVeileder)}
      <Vis hvis={activeOffentligPrivat === 'PRIVAT'}>
        {CheckboxSpørsmål(transportAlternativerPrivat)}
      </Vis>
      {InputSpørsmål(månedligeUtgifterSpørsmål)}
      {InputSpørsmål(antallKilometerSpørsmål)}
    </>
  );
};

export default DagensTransportmiddel;
