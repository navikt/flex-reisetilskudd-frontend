import React, { ReactElement, useEffect, useState } from 'react';
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
  transportalternativerKollektivt,
} from '../../components/sporsmal/spørsmålTekster';
import { useAppStore } from '../../data/stores/app-store';
import { validerNumerisk, validerKroner } from '../../utils/skjemavalidering';
import './dagens-transportmiddel.less';
import InputSporsmal from '../../components/sporsmal/inputSporsmal/InputSporsmal';
import VidereKnapp from '../../components/knapper/VidereKnapp';

const DagensTransportmiddel = (): ReactElement => {
  const [
    visningsFeilmeldinger, settVisningsFeilmeldinger,
  ] = useState<FeiloppsummeringFeil[]>([]);
  const [skalViseFeil, settSkalViseFeil] = useState<boolean>(false);
  const [skalViseKilometerFeil, settSkalViseKilometerFeil] = useState<boolean>(false);
  const [
    skalViseMånedligeUtgifterFeil, settSkalViseMånedligeUtgifterFeil,
  ] = useState<boolean>(false);
  const [gårTilNesteSide, settGårTilNesteSide] = useState<boolean>(false);
  // TODO: Fikse underfelt sin feilmelding:
  const [skalHaFullValiering, settskalHaFullValiering] = useState<boolean>(false);

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
        return [
          {
            skjemaelementId: antallKilometerSpørsmål.id,
            feilmelding: 'Du må oppgi gyldig verdi for kilometer',
          },
        ];
      }
    }
    return [];
  };

  const validerMånedligeUtgifter = (nyesteVerdi : string | null = null): FeiloppsummeringFeil[] => {
    if (
      dagensTransportMiddelKollektivChecked
      && !validerKroner(nyesteVerdi || månedligeUtgifterState)
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

  const handleKilometerChange = (nyInput: string) => {
    // kanskjeValiderSkjema(antallKilometerSpørsmål.id, nyInput);
    settAntallKilometerState(nyInput);
  };

  const handleMånedligeUtgifterChange = (nyInput: string) => {
    // kanskjeValiderSkjema(månedligeUtgifterSpørsmål.id, nyInput);
    settMånedligeUtgifterState(nyInput);
  };

  const fåFeilmeldingTilInput = (
    hvilkenInput : string,
  ) : string | undefined => visningsFeilmeldinger.find(
    (element) => element.skjemaelementId === hvilkenInput,
  )?.feilmelding;

  useEffect(() => {
    const valideringsFeil: FeiloppsummeringFeil[] = [];

    const checkBoxFeil = validerCheckboxer();
    const kilometerFeil = validerAntallKilometerInput();
    const månedligeUtgifterFeil = validerMånedligeUtgifter();

    valideringsFeil.push(...checkBoxFeil);
    valideringsFeil.push(...kilometerFeil);
    valideringsFeil.push(...månedligeUtgifterFeil);

    if (skalViseFeil) {
      const visningsFeil: FeiloppsummeringFeil[] = [];
      visningsFeil.push(...checkBoxFeil);
      if (skalHaFullValiering && skalViseKilometerFeil) {
        visningsFeil.push(...kilometerFeil);
      }
      if (skalHaFullValiering && skalViseMånedligeUtgifterFeil) {
        visningsFeil.push(...månedligeUtgifterFeil);
      }

      settVisningsFeilmeldinger(visningsFeil);
    }

    if (valideringsFeil.length < 1) {
      settDagensTransportmiddelValidert(true);
      settSkalViseFeil(false);
      settskalHaFullValiering(false);
    } else {
      settDagensTransportmiddelValidert(false);
    }
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [
    skalViseFeil,
    skalViseKilometerFeil,
    skalViseMånedligeUtgifterFeil,
    dagensTransportMiddelEgenBilChecked,
    dagensTransportMiddelSyklerChecked,
    dagensTransportMiddelGårChecked,
    dagensTransportMiddelKollektivChecked,
    månedligeUtgifterState,
    antallKilometerState,
  ]);

  useEffect(() => {
    settSkalViseMånedligeUtgifterFeil(true);
    settSkalViseKilometerFeil(true);
  }, [
    skalViseFeil,
  ]);

  useEffect(() => {
    settskalHaFullValiering(false);
  }, [
    dagensTransportMiddelEgenBilChecked,
    dagensTransportMiddelKollektivChecked,
  ]);

  const handleVidereKlikk = () => {
    settSkalViseFeil(true);
    settskalHaFullValiering(true);
    if (dagensTransportmiddelValidert) {
      settGårTilNesteSide(true);
    }
  };

  return (
    <>
      <Undertittel> Transportmiddel til daglig </Undertittel>
      <Normaltekst> Hva slags transportmiddel bruker du til daglig? </Normaltekst>
      {Veileder(transportVeileder)}
      {DagensTransportmiddelCheckbox(transportalternativer)}
      <Vis
        hvis={dagensTransportMiddelEgenBilChecked === true}
      >
        {InputSporsmal(
          {
            ...{
              onChange: handleKilometerChange,
              value: antallKilometerState,
              feil: fåFeilmeldingTilInput(antallKilometerSpørsmål.id),
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
                feil: fåFeilmeldingTilInput(månedligeUtgifterSpørsmål.id),
              },
              ...månedligeUtgifterSpørsmål,
            },
          )}
        </Vis>
      </div>
      <Vis hvis={dagensTransportmiddelValidert}>
        Skjemaet er validert, wohoo!
      </Vis>
      <Vis hvis={skalViseFeil && visningsFeilmeldinger.length > 0}>
        <Feiloppsummering tittel="For å gå videre må du rette opp følgende:" feil={visningsFeilmeldinger} />
      </Vis>
      <VidereKnapp
        aktivtSteg={2}
        onClick={handleVidereKlikk}
        skalGåTilNesteSideNå={gårTilNesteSide}
      />
    </>
  );
};

export default DagensTransportmiddel;
