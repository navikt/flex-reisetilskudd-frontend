import React, { ReactElement, useEffect, useState } from 'react';
import { Feiloppsummering, FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { useParams, useHistory } from 'react-router-dom';
import DagensTransportmiddelCheckbox
  from '../../components/sporsmal/dagensTransportmiddelCheckbox/dagensTransportmiddelCheckbox';
import Vis from '../../components/Vis';
import {
  transportalternativer,
  antallKilometerSpørsmål,
  månedligeUtgifterSpørsmål,
  transportalternativerKollektivt,
} from '../../components/sporsmal/sporsmalTekster';
import { useAppStore } from '../../data/stores/app-store';
import { validerNumerisk, validerKroner } from '../../utils/skjemavalidering';
import './dagens-transportmiddel.less';
import InputSporsmal from '../../components/sporsmal/inputSporsmal/InputSporsmal';
import VidereKnapp from '../../components/knapper/VidereKnapp';
import { hjelpetekstDagensTransportmiddel } from '../../constants/hjelpetekster';
import env from '../../utils/environment';
import { post } from '../../data/fetcher/fetcher';
import { logger } from '../../utils/logger';

import { gåTilNesteSide } from '../../utils/navigasjon';

interface TransportmiddelInterface {
  reisetilskuddId: string;
  går?: boolean;
  sykler?: boolean;
  egenBil?: number;
  kollektivtransport?: number;
}

const DagensTransportmiddel = (): ReactElement => {
  const [
    visningsFeilmeldinger, settVisningsFeilmeldinger,
  ] = useState<FeiloppsummeringFeil[]>([]);
  const [skalViseFeil, settSkalViseFeil] = useState<boolean>(false);
  const [skalViseKilometerFeil, settSkalViseKilometerFeil] = useState<boolean>(false);
  const [
    skalViseMånedligeUtgifterFeil, settSkalViseMånedligeUtgifterFeil,
  ] = useState<boolean>(false);

  const {
    dagensTransportMiddelEgenBilChecked,
    dagensTransportMiddelSyklerChecked,
    dagensTransportMiddelGårChecked,
    dagensTransportMiddelKollektivChecked,
    månedligeUtgifterState, settMånedligeUtgifterState,
    antallKilometerState, settAntallKilometerState,
    dagensTransportmiddelValidert, settDagensTransportmiddelValidert,
  } = useAppStore();

  const { soknadssideID, reisetilskuddID } = useParams();
  const soknadssideIDTall = Number(soknadssideID);

  const history = useHistory();

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
    /* Gyldig verdi skrevet inn,
     * skal ikke validere dette feltet igjen før brukeren trykker for å gå videre:
     */
    settSkalViseKilometerFeil(false);
    return [];
  };

  const validerMånedligeUtgifter = (nyesteVerdi: string | null = null): FeiloppsummeringFeil[] => {
    if (
      dagensTransportMiddelKollektivChecked
      && !validerKroner(nyesteVerdi || månedligeUtgifterState)
    ) {
      return [{ skjemaelementId: månedligeUtgifterSpørsmål.id, feilmelding: 'Du må oppgi gyldig kroneverdi' }];
    }
    /* Gyldig verdi skrevet inn,
     * skal ikke validere dette feltet igjen før brukeren trykker for å gå videre:
     */
    settSkalViseMånedligeUtgifterFeil(false);
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
          skjemaelementId: transportalternativer.svaralternativer[0].id,
          feilmelding: 'Du må velge minst étt av alternativene for fremkomstmiddel',
        },
      ];
    }
    return [];
  };

  const handleKilometerChange = (nyInput: string) => {
    settAntallKilometerState(nyInput);
  };

  const handleMånedligeUtgifterChange = (nyInput: string) => {
    settMånedligeUtgifterState(nyInput);
  };

  const fåFeilmeldingTilInput = (
    hvilkenInput: string,
  ): string | undefined => visningsFeilmeldinger.find(
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
      if (skalViseKilometerFeil) {
        visningsFeil.push(...kilometerFeil);
      }
      if (skalViseMånedligeUtgifterFeil) {
        visningsFeil.push(...månedligeUtgifterFeil);
      }

      settVisningsFeilmeldinger(visningsFeil);
    }

    if (valideringsFeil.length < 1) {
      settDagensTransportmiddelValidert(true);
      settSkalViseFeil(false);
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
    // Skal ikke vise feilmelding for et felt som nettopp er åpnet
    settSkalViseKilometerFeil(false);
  }, [
    dagensTransportMiddelEgenBilChecked,
  ]);

  useEffect(() => {
    // Skal ikke vise feilmelding for et felt som nettopp er åpnet
    settSkalViseMånedligeUtgifterFeil(false);
  }, [
    dagensTransportMiddelKollektivChecked,
  ]);

  const handleVidereKlikk = () => {
    post<TransportmiddelInterface>(`${env.apiUrl}/reisetilskudd`, {
      reisetilskuddId: reisetilskuddID,
      går: dagensTransportMiddelGårChecked,
      sykler: dagensTransportMiddelSyklerChecked,
      egenBil: parseFloat(antallKilometerState),
      kollektivtransport: parseFloat(månedligeUtgifterState),
    }).then(() => {
      settSkalViseMånedligeUtgifterFeil(true);
      settSkalViseKilometerFeil(true);
      settSkalViseFeil(true);
      if (dagensTransportmiddelValidert) {
        gåTilNesteSide(history, soknadssideIDTall);
      }
    }).catch((error) => {
      logger.error('Feil ved oppdatering av skjema', error);
    });
  };

  return (
    <div className="dagens-transportmiddel-wrapper">
      <Systemtittel> Transportmiddel til daglig </Systemtittel>
      <div className="transportmiddel-tekst">
        <Normaltekst className="transportmiddel-spørsmål" id="transportmiddel-spørsmål" aria-describedby="min-hjelpetekst-kollektivtransport">
          Hvilke transportmidler brukte du til og fra jobb før du ble sykmeldt?
        </Normaltekst>
        <Hjelpetekst className="kollektivtransport-hjelpetekst" id="min-hjelpetekst-kollektivtransport" aria-describedby="transportmiddel-spørsmål">
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
      <Vis hvis={skalViseFeil && visningsFeilmeldinger.length > 0}>
        <Feiloppsummering tittel="For å gå videre må du rette opp følgende:" feil={visningsFeilmeldinger} />
      </Vis>
      <VidereKnapp
        aktivtSteg={soknadssideIDTall}
        onClick={handleVidereKlikk}
      />
    </div>
  );
};

export default DagensTransportmiddel;
