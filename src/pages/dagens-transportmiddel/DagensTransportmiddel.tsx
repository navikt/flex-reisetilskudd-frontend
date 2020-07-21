import React, { ReactElement } from 'react';
import RadioSporsmalOffentligPrivat from '../../components/sporsmal/radioSporsmal/RadioSporsmalOffentligPrivat';
import Veileder from '../../components/sporsmal/Veileder';
import DagensTransportmiddelCheckbox from '../../components/sporsmal/dagensTransportmiddelCheckbox/dagensTransportmiddelCheckbox';
import InputSporsmal from '../../components/sporsmal/inputSporsmal/InputSporsmal';
import Vis from '../../components/Vis';
import {
  offentligPrivatSpørsmål, transportalternativerPrivat,
  antallKilometerSpørsmål, månedligeUtgifterSpørsmål, transportVeileder,
} from '../../components/sporsmal/spørsmålTekster';
import { useAppStore } from '../../data/stores/app-store';
import { endreInputVerdi } from '../../components/sporsmal/sporsmalsUtils';
import { NummerInputStateEnum } from '../../models/dagenstransportmiddel';

const DagensTransportmiddel = (): ReactElement => {
  const { dagensTransportmiddelState, settDagensTransportmiddelState } = useAppStore();

  const handleKilometerChange = (tekst: string) => {
    endreInputVerdi(
      NummerInputStateEnum.antallKilometerSpørsmål,
      tekst,
      dagensTransportmiddelState,
      settDagensTransportmiddelState,
    );
  };

  const handleMånedligeUtgifterChange = (tekst: string) => {
    endreInputVerdi(
      NummerInputStateEnum.månedligeUtgifterSpørsmål,
      tekst,
      dagensTransportmiddelState,
      settDagensTransportmiddelState,
    );
  };

  return (
    <>
      {Veileder(transportVeileder)}
      {RadioSporsmalOffentligPrivat(offentligPrivatSpørsmål)}
      <Vis hvis={dagensTransportmiddelState.offentligPrivatSpørsmål === 'OFFENTLIG'}>
        {InputSporsmal(
          {
            ...{
              onChange: handleMånedligeUtgifterChange,
              value: dagensTransportmiddelState.månedligeUtgifterSpørsmål,
            },
            ...månedligeUtgifterSpørsmål,
          },
        )}
      </Vis>
      <Vis hvis={dagensTransportmiddelState.offentligPrivatSpørsmål === 'PRIVAT'}>
        {DagensTransportmiddelCheckbox(transportalternativerPrivat)}
        <Vis hvis={dagensTransportmiddelState.transportalternativerPrivat.egenBilChecked === true}>
          {InputSporsmal(
            {
              ...{
                onChange: handleKilometerChange,
                value: dagensTransportmiddelState.antallKilometerSpørsmål,
              },
              ...antallKilometerSpørsmål,
            },
          )}
        </Vis>
      </Vis>
    </>
  );
};

export default DagensTransportmiddel;
