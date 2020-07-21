import React, { ReactElement, useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Feiloppsummering, FeiloppsummeringFeil } from 'nav-frontend-skjema';
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
  const [validert, settValidert] = useState<boolean | undefined>(undefined);
  const [valideringsFeil, settValideringsFeil] = useState<FeiloppsummeringFeil[]>([]);
  const { dagensTransportmiddelState, settDagensTransportmiddelState } = useAppStore();

  const handleKilometerChange = (tekst: string) => {
    endreInputVerdi(
      NummerInputStateEnum.antallKilometerSpørsmål,
      tekst,
      dagensTransportmiddelState,
      settDagensTransportmiddelState,
    );
  };

  const validerSkjema = () => {
    const nyeValideringsFeil : FeiloppsummeringFeil[] = [
      { skjemaelementId: 'abc', feilmelding: 'Du må svare på bla' },
      { skjemaelementId: 'def', feilmelding: 'Blabla må være en dings' },
      { skjemaelementId: 'ghi', feilmelding: 'Abc må være x' },
    ];
    settValideringsFeil(nyeValideringsFeil);
    settValidert(false);
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
      <Knapp type="hoved" onClick={validerSkjema}>Validér skjemaet</Knapp>
      <Vis hvis={validert}>
        Skjemaet er validert, wohoo!
      </Vis>
      <Vis hvis={validert === false}>
        <Feiloppsummering tittel="For å gå videre må du rette opp følgende:" feil={valideringsFeil} />
      </Vis>
    </>
  );
};

export default DagensTransportmiddel;
