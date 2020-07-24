import React, { ReactElement, useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Feiloppsummering, FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Veileder from '../../components/sporsmal/Veileder';
import DagensTransportmiddelCheckbox from '../../components/sporsmal/dagensTransportmiddelCheckbox/dagensTransportmiddelCheckbox';
import Vis from '../../components/Vis';
import {
  transportalternativer,
  antallKilometerSpørsmål,
  månedligeUtgifterSpørsmål,
  transportVeileder,
  transportalternativerKollektivt,
} from '../../components/sporsmal/spørsmålTekster';
import { useAppStore } from '../../data/stores/app-store';
import { validerKilometer, validerKroner } from '../../utils/skjemavalidering';
import './dagens-transportmiddel.less';
import InputSporsmal from '../../components/sporsmal/inputSporsmal/InputSporsmal';
import { endreInputVerdi } from '../../components/sporsmal/sporsmalsUtils';
import { NummerInputStateEnum } from '../../models/dagenstransportmiddel';

const DagensTransportmiddel = (): ReactElement => {
  const [valideringsFeil, settValideringsFeil] = useState<FeiloppsummeringFeil[]>([]);
  const {
    dagensTransportmiddelState, settDagensTransportmiddelState,
    dagensTransportmiddelValidert, settDagensTransportmiddelValidert,
  } = useAppStore();

  const validerMånedligeUtgifter = (nyeValideringsFeil: FeiloppsummeringFeil[]) => {
    if (!validerKroner(dagensTransportmiddelState.månedligeUtgifterSpørsmål)) {
      nyeValideringsFeil.push(
        { skjemaelementId: månedligeUtgifterSpørsmål.id, feilmelding: 'Ugyldig kroneverdi' },
      );
    }
  };

  const handleKilometerChange = (tekst: string) => {
    endreInputVerdi(
      NummerInputStateEnum.antallKilometerSpørsmål,
      tekst,
      dagensTransportmiddelState,
      settDagensTransportmiddelState,
    );
    settDagensTransportmiddelValidert(undefined);
  };

  const handleMånedligeUtgifterChange = (tekst: string) => {
    endreInputVerdi(
      NummerInputStateEnum.månedligeUtgifterSpørsmål,
      tekst,
      dagensTransportmiddelState,
      settDagensTransportmiddelState,
    );
    settDagensTransportmiddelValidert(undefined);
  };

  const validerTransportmidler = (nyeValideringsFeil: FeiloppsummeringFeil[]) => {
    if (
      !dagensTransportmiddelState.transportalternativer.egenBilChecked
      && !dagensTransportmiddelState.transportalternativer.syklerChecked
      && !dagensTransportmiddelState.transportalternativer.gårChecked
      && !dagensTransportmiddelState.transportalternativer.kollektivtransportChecked
    ) {
      nyeValideringsFeil.push(
        { skjemaelementId: transportalternativer.id, feilmelding: 'Du må velge minst étt av alternativene for fremkomstmiddel' },
      );
    }

    if (dagensTransportmiddelState.transportalternativer.egenBilChecked) {
      if (!validerKilometer(dagensTransportmiddelState.antallKilometerSpørsmål)) {
        nyeValideringsFeil.push(
          { skjemaelementId: antallKilometerSpørsmål.id, feilmelding: 'Ugyldig kilometerverdi' },
        );
      }
    }
  };

  const validerSkjema = () => {
    const nyeValideringsFeil: FeiloppsummeringFeil[] = [];

    settValideringsFeil(nyeValideringsFeil);
    settDagensTransportmiddelValidert(nyeValideringsFeil.length < 1);
    validerTransportmidler(nyeValideringsFeil);
    validerMånedligeUtgifter(nyeValideringsFeil);
  };

  return (
    <>
      <Undertittel> Transportmiddel til daglig </Undertittel>
      <Normaltekst> Hva slags transportmiddel bruker du til daglig? </Normaltekst>
      {Veileder(transportVeileder)}
      {DagensTransportmiddelCheckbox(transportalternativer)}
      <Vis
        hvis={dagensTransportmiddelState.transportalternativer.egenBilChecked === true}
      >
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
      <div className="transportalternativerKollektivt">
        {DagensTransportmiddelCheckbox(transportalternativerKollektivt)}
        <Vis
          hvis={dagensTransportmiddelState.transportalternativer.kollektivtransportChecked === true}
        >
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
      </div>
      <Knapp type="hoved" onClick={validerSkjema}>Validér skjemaet</Knapp>
      <Vis hvis={dagensTransportmiddelValidert}>
        Skjemaet er validert, wohoo!
      </Vis>
      <Vis hvis={dagensTransportmiddelValidert === false}>
        <Feiloppsummering tittel="For å gå videre må du rette opp følgende:" feil={valideringsFeil} />
      </Vis>
    </>
  );
};

export default DagensTransportmiddel;
