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
  antallKilometerSpørsmål, månedligeUtgifterSpørsmål, transportVeileder, offentligPrivatVerdier,
} from '../../components/sporsmal/spørsmålTekster';
import { useAppStore } from '../../data/stores/app-store';
import { endreInputVerdi } from '../../components/sporsmal/sporsmalsUtils';
import { NummerInputStateEnum } from '../../models/dagenstransportmiddel';
import { validerKilometer, validerKroner } from '../../utils/skjemavalidering';

const DagensTransportmiddel = (): ReactElement => {
  const [valideringsFeil, settValideringsFeil] = useState<FeiloppsummeringFeil[]>([]);
  const {
    dagensTransportmiddelState, settDagensTransportmiddelState,
    dagensTransportMiddelValidert, settDagensTransportMiddelValidert,
  } = useAppStore();

  const handleKilometerChange = (tekst: string) => {
    endreInputVerdi(
      NummerInputStateEnum.antallKilometerSpørsmål,
      tekst,
      dagensTransportmiddelState,
      settDagensTransportmiddelState,
    );
    settDagensTransportMiddelValidert(undefined);
  };

  const handleMånedligeUtgifterChange = (tekst: string) => {
    endreInputVerdi(
      NummerInputStateEnum.månedligeUtgifterSpørsmål,
      tekst,
      dagensTransportmiddelState,
      settDagensTransportmiddelState,
    );
    settDagensTransportMiddelValidert(undefined);
  };

  const validerOffentlig = (nyeValideringsFeil : FeiloppsummeringFeil[]) => {
    if (!validerKroner(dagensTransportmiddelState.månedligeUtgifterSpørsmål)) {
      nyeValideringsFeil.push(
        { skjemaelementId: månedligeUtgifterSpørsmål.id, feilmelding: 'Ugyldig kroneverdi' },
      );
    }
  };

  const validerPrivat = (nyeValideringsFeil : FeiloppsummeringFeil[]) => {
    if (
      !dagensTransportmiddelState.transportalternativerPrivat.egenBilChecked
      && !dagensTransportmiddelState.transportalternativerPrivat.syklerChecked
      && !dagensTransportmiddelState.transportalternativerPrivat.gårChecked
    ) {
      nyeValideringsFeil.push(
        { skjemaelementId: transportalternativerPrivat.id, feilmelding: 'Du må velge minst étt av alternativene for fremkomstmiddel' },
      );
    }

    if (dagensTransportmiddelState.transportalternativerPrivat.egenBilChecked) {
      if (!validerKilometer(dagensTransportmiddelState.antallKilometerSpørsmål)) {
        nyeValideringsFeil.push(
          { skjemaelementId: antallKilometerSpørsmål.id, feilmelding: 'Ugyldig kilometerverdi' },
        );
      }
    }
  };

  const validerSkjema = () => {
    const nyeValideringsFeil : FeiloppsummeringFeil[] = [];

    if (dagensTransportmiddelState.offentligPrivatSpørsmål === offentligPrivatVerdier.OFFENTLIG) {
      validerOffentlig(nyeValideringsFeil);
    } else if (
      dagensTransportmiddelState.offentligPrivatSpørsmål === offentligPrivatVerdier.PRIVAT
    ) {
      validerPrivat(nyeValideringsFeil);
    } else {
      nyeValideringsFeil.push(
        { skjemaelementId: offentligPrivatSpørsmål.id, feilmelding: 'Du må svare på om du reiser offentlig eller privat' },
      );
    }

    settValideringsFeil(nyeValideringsFeil);
    settDagensTransportMiddelValidert(nyeValideringsFeil.length < 1);
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
      <Vis hvis={dagensTransportMiddelValidert}>
        Skjemaet er validert, wohoo!
      </Vis>
      <Vis hvis={dagensTransportMiddelValidert === false}>
        <Feiloppsummering tittel="For å gå videre må du rette opp følgende:" feil={valideringsFeil} />
      </Vis>
    </>
  );
};

export default DagensTransportmiddel;
