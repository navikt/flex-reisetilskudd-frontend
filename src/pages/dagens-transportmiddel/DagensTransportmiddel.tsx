import React, { ReactElement, useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Feiloppsummering, FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Veileder from '../../components/sporsmal/Veileder';
import DagensTransportmiddelCheckbox
  from '../../components/sporsmal/dagensTransportmiddelCheckbox/dagensTransportmiddelCheckbox';
import Vis from '../../components/Vis';
import {
  transportalternativer,
  antallKilometerSpørsmål,
  månedligeUtgifterSpørsmål,
  transportVeileder,
  transportalternativerKollektivt, transportalternativerVerdier,
} from '../../components/sporsmal/spørsmålTekster';
import { useAppStore } from '../../data/stores/app-store';
import { validerNumerisk, validerKroner } from '../../utils/skjemavalidering';
import './dagens-transportmiddel.less';
import InputSporsmal from '../../components/sporsmal/inputSporsmal/InputSporsmal';

const DagensTransportmiddel = (): ReactElement => {
  const [valideringsFeil, settValideringsFeil] = useState<FeiloppsummeringFeil[]>([]);
  const [kilometerInputFeilmelding, settKilometerInputFeilmelding] = useState<string>('');

  const {
    dagensTransportMiddelEgenBilChecked,
    dagensTransportMiddelSyklerChecked,
    dagensTransportMiddelGårChecked,
    dagensTransportMiddelKollektivChecked,
    månedligeUtgifterState, settMånedligeUtgifterState,
    antallKilometerState, settAntallKilometerState,
    dagensTransportmiddelValidert, settDagensTransportmiddelValidert,
  } = useAppStore();

  const validerAntallKilometerInput = (): FeiloppsummeringFeil[] => {
    if (dagensTransportMiddelEgenBilChecked) {
      if (!validerNumerisk(antallKilometerState)) {
        settKilometerInputFeilmelding('Du må oppgi gyldig verdi for kilometer');
        return [
          {
            skjemaelementId: antallKilometerSpørsmål.id,
            feilmelding: 'Ugyldig kilometerverdi',
          },
        ];
      }
    }
    return [];
  };

  const validerMånedligeUtgifter = (): FeiloppsummeringFeil[] => {
    if (
      dagensTransportMiddelKollektivChecked
      && !validerKroner(månedligeUtgifterState)
    ) {
      return [{ skjemaelementId: månedligeUtgifterSpørsmål.id, feilmelding: 'Ugyldig kroneverdi' }];
    }
    return [];
  };

  const validerCheckboxer = (): FeiloppsummeringFeil[] => {
    if (
      !dagensTransportMiddelEgenBilChecked
      && !dagensTransportMiddelSyklerChecked
      && !dagensTransportMiddelGårChecked
      && !dagensTransportMiddelKollektivChecked
    ) {
      return [
        {
          skjemaelementId: transportalternativer.id,
          feilmelding: 'Du må velge minst étt av alternativene for fremkomstmiddel',
        },
      ];
    }
    return [];
  };

  const validerSkjema = (transportAlternativNettoppChecked : string | null = null) => {
    console.log('validerSkjema:', transportAlternativNettoppChecked);
    const nyeValideringsFeil: FeiloppsummeringFeil[] = [];
    nyeValideringsFeil.push(...validerCheckboxer());
    if (transportAlternativNettoppChecked !== transportalternativerVerdier.EGEN_BIL) {
      nyeValideringsFeil.push(...validerAntallKilometerInput());
    }
    if (transportAlternativNettoppChecked !== transportalternativerVerdier.KOLLEKTIVTRANSPORT) {
      nyeValideringsFeil.push(...validerMånedligeUtgifter());
    }

    settValideringsFeil(nyeValideringsFeil);
    settDagensTransportmiddelValidert(nyeValideringsFeil.length < 1);
  };

  const handleKilometerChange = (nyInput: string) => {
    validerSkjema();
    settAntallKilometerState(nyInput);
  };

  const handleMånedligeUtgifterChange = (nyInput: string) => {
    validerSkjema();
    settMånedligeUtgifterState(nyInput);
  };

  return (
    <>
      <Undertittel> Transportmiddel til daglig </Undertittel>
      <Normaltekst> Hva slags transportmiddel bruker du til daglig? </Normaltekst>
      {Veileder(transportVeileder)}
      {DagensTransportmiddelCheckbox({
        ...{
          validerSkjema,
        },
        ...transportalternativer,
      })}
      <Vis
        hvis={dagensTransportMiddelEgenBilChecked === true}
      >
        {InputSporsmal(
          {
            ...{
              onChange: handleKilometerChange,
              value: antallKilometerState,
              feil: kilometerInputFeilmelding,
            },
            ...antallKilometerSpørsmål,
          },
        )}
      </Vis>
      <div className="transportalternativerKollektivt">
        {DagensTransportmiddelCheckbox({
          ...{
            validerSkjema,
          },
          ...transportalternativerKollektivt,
        })}
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
      <Knapp type="hoved" onClick={() => { validerSkjema(); }}>Validér skjemaet</Knapp>
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
