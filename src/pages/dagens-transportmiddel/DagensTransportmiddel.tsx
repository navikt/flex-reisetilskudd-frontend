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
  transportalternativerKollektivt, transportalternativerVerdier,
} from '../../components/sporsmal/spørsmålTekster';
import { useAppStore } from '../../data/stores/app-store';
import { validerNumerisk, validerKroner } from '../../utils/skjemavalidering';
import './dagens-transportmiddel.less';
import InputSporsmal from '../../components/sporsmal/inputSporsmal/InputSporsmal';
import VidereKnapp from '../../components/knapper/VidereKnapp';

const DagensTransportmiddel = (): ReactElement => {
  const [
    valideringsFeilMeldinger, settValideringsFeilMeldinger,
  ] = useState<FeiloppsummeringFeil[]>([]);
  const [skalValidere, settSkalValidere] = useState<boolean>(false);

  const {
    dagensTransportMiddelEgenBilChecked,
    dagensTransportMiddelSyklerChecked,
    dagensTransportMiddelGårChecked,
    dagensTransportMiddelKollektivChecked,
    månedligeUtgifterState, settMånedligeUtgifterState,
    antallKilometerState, settAntallKilometerState,
    dagensTransportmiddelValidert, settDagensTransportmiddelValidert,
  } = useAppStore();

  const validerAntallKilometerInput = (
    nyesteVerdi : string | null = null,
  ): FeiloppsummeringFeil[] => {
    if (dagensTransportMiddelEgenBilChecked) {
      if (!validerNumerisk(nyesteVerdi || antallKilometerState)) {
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

  const validerCheckboxer = (nyesteVerdi : string | null = null): FeiloppsummeringFeil[] => {
    if (
      (
        !dagensTransportMiddelEgenBilChecked
        && !dagensTransportMiddelSyklerChecked
        && !dagensTransportMiddelGårChecked
        && !dagensTransportMiddelKollektivChecked
      )
      && nyesteVerdi === null
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

  const validerSkjema = (
    hvilkenInputID: string | null = null,
    nyesteVerdi : string | null = null,
  ) : boolean => {
    const nyeValideringsFeil: FeiloppsummeringFeil[] = [];
    nyeValideringsFeil.push(
      ...validerCheckboxer(
        hvilkenInputID === transportalternativer.id
          ? nyesteVerdi
          : null,
      ),
    );
    if (
    // Skal alltid kjøre med mindre tilhørende checkbox nettopp er endret:
      !(
        nyesteVerdi === transportalternativerVerdier.EGEN_BIL
          && hvilkenInputID === transportalternativer.id
      )
    ) {
      nyeValideringsFeil.push(
        ...validerAntallKilometerInput(
          hvilkenInputID === antallKilometerSpørsmål.id
            ? nyesteVerdi
            : null,
        ),
      );
    }
    if (
    // Skal alltid kjøre med mindre tilhørende checkbox nettopp er endret:
      !(
        nyesteVerdi === transportalternativerVerdier.KOLLEKTIVTRANSPORT
          && hvilkenInputID === transportalternativer.id
      )
    ) {
      nyeValideringsFeil.push(
        ...validerMånedligeUtgifter(
          hvilkenInputID === månedligeUtgifterSpørsmål.id
            ? nyesteVerdi
            : null,
        ),
      );
    }

    settValideringsFeilMeldinger(nyeValideringsFeil);

    if (nyeValideringsFeil.length < 1) {
      settSkalValidere(false);
      settDagensTransportmiddelValidert(true);
      return true;
    }
    settDagensTransportmiddelValidert(false);

    return false;
  };

  const kanskjeValiderSkjema = (
    hvilkenInputID: string | null = null,
    nyesteVerdi : string | null = null,
  ) => {
    if (skalValidere) {
      validerSkjema(hvilkenInputID, nyesteVerdi);
    }
  };

  const handleKilometerChange = (nyInput: string) => {
    kanskjeValiderSkjema(antallKilometerSpørsmål.id, nyInput);
    settAntallKilometerState(nyInput);
  };

  const handleMånedligeUtgifterChange = (nyInput: string) => {
    kanskjeValiderSkjema(månedligeUtgifterSpørsmål.id, nyInput);
    settMånedligeUtgifterState(nyInput);
  };

  const fåFeilmeldingTilInput = (
    hvilkenInput : string,
  ) : string | undefined => valideringsFeilMeldinger.find(
    (element) => element.skjemaelementId === hvilkenInput,
  )?.feilmelding;

  useEffect(() => {
    kanskjeValiderSkjema();
  }, [skalValidere]);

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
              feil: fåFeilmeldingTilInput(antallKilometerSpørsmål.id),
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
      <Vis hvis={dagensTransportmiddelValidert === false}>
        <Feiloppsummering tittel="For å gå videre må du rette opp følgende:" feil={valideringsFeilMeldinger} />
      </Vis>
      <VidereKnapp
        aktivtSteg={2}
        valideringsFunksjon={validerSkjema}
      />
    </>
  );
};

export default DagensTransportmiddel;
