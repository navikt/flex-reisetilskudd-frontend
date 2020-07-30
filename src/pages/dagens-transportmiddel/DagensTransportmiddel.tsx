import React, { ReactElement, useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Feiloppsummering, FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import DagensTransportmiddelCheckbox
  from '../../components/sporsmal/dagensTransportmiddelCheckbox/dagensTransportmiddelCheckbox';
import Vis from '../../components/Vis';
import {
  transportalternativer,
  antallKilometerSpørsmål,
  månedligeUtgifterSpørsmål,
  transportalternativerKollektivt,
} from '../../components/sporsmal/spørsmålTekster';
import { useAppStore } from '../../data/stores/app-store';
import { validerKilometer, validerKroner } from '../../utils/skjemavalidering';
import './dagens-transportmiddel.less';
import InputSporsmal from '../../components/sporsmal/inputSporsmal/InputSporsmal';
import { hjelpetekstDagensTransportmiddel } from '../../constants/hjelpetekster';

const DagensTransportmiddel = (): ReactElement => {
  const [valideringsFeil, settValideringsFeil] = useState<FeiloppsummeringFeil[]>([]);
  const {
    dagensTransportMiddelEgenBilChecked,
    dagensTransportMiddelSyklerChecked,
    dagensTransportMiddelGårChecked,
    dagensTransportMiddelKollektivChecked,
    månedligeUtgifterState, settMånedligeUtgifterState,
    antallKilometerState, settAntallKilometerState,
    dagensTransportmiddelValidert, settDagensTransportmiddelValidert,
  } = useAppStore();

  const handleKilometerChange = (nyInput: string) => {
    settAntallKilometerState(nyInput);
    settDagensTransportmiddelValidert(undefined);
  };

  const handleMånedligeUtgifterChange = (nyInput: string) => {
    settMånedligeUtgifterState(nyInput);
    settDagensTransportmiddelValidert(undefined);
  };

  const validerTransportmidler = (nyeValideringsFeil: FeiloppsummeringFeil[]) => {
    if (
      !dagensTransportMiddelEgenBilChecked
      && !dagensTransportMiddelSyklerChecked
      && !dagensTransportMiddelGårChecked
      && !dagensTransportMiddelKollektivChecked
    ) {
      nyeValideringsFeil.push(
        {
          skjemaelementId: transportalternativer.id,
          feilmelding: 'Du må velge minst étt av alternativene for fremkomstmiddel',
        },
      );
    }

    if (dagensTransportMiddelEgenBilChecked) {
      if (!validerKilometer(antallKilometerState)) {
        nyeValideringsFeil.push(
          {
            skjemaelementId: antallKilometerSpørsmål.id,
            feilmelding: 'Ugyldig kilometerverdi',
          },
        );
      }
    }
  };

  const validerMånedligeUtgifter = (nyeValideringsFeil: FeiloppsummeringFeil[]) => {
    if (
      dagensTransportMiddelKollektivChecked
      && !validerKroner(månedligeUtgifterState)
    ) {
      nyeValideringsFeil.push(
        {
          skjemaelementId: månedligeUtgifterSpørsmål.id,
          feilmelding: 'Ugyldig kroneverdi',
        },
      );
    }
  };

  const validerSkjema = () => {
    const nyeValideringsFeil: FeiloppsummeringFeil[] = [];

    validerTransportmidler(nyeValideringsFeil);
    validerMånedligeUtgifter(nyeValideringsFeil);

    settValideringsFeil(nyeValideringsFeil);
    settDagensTransportmiddelValidert(nyeValideringsFeil.length < 1);
  };

  return (
    <>
      <Undertittel> Transportmiddel til daglig </Undertittel>
      <div className="transportmiddel-tekst">
        <Normaltekst className="transportmiddel-spørsmål">
          Hvilke transportmidler brukte du til og fra jobb før du ble sykmeldt?
        </Normaltekst>
        <Hjelpetekst className="kollektivtransport-hjelpetekst">
          {hjelpetekstDagensTransportmiddel.hjelpetekst}
        </Hjelpetekst>
      </div>
      {DagensTransportmiddelCheckbox(transportalternativer)}
      <Vis
        hvis={dagensTransportMiddelEgenBilChecked === true}
      >
        {InputSporsmal(
          {
            ...{
              onChange: handleKilometerChange,
              value: antallKilometerState,
            },
            ...antallKilometerSpørsmål,
          },
        )}
      </Vis>
      <div className="transportalternativerKollektivt">
        {DagensTransportmiddelCheckbox(transportalternativerKollektivt)}
        <Vis
          hvis={dagensTransportMiddelKollektivChecked === true}
        >
          {InputSporsmal(
            {
              ...{
                onChange: handleMånedligeUtgifterChange,
                value: månedligeUtgifterState,
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
