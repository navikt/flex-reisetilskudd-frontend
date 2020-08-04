import React, { ReactElement, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FeiloppsummeringFeil, Feiloppsummering } from 'nav-frontend-skjema';
import RadioSpørsmålUtbetaling from '../../components/sporsmal/radioSporsmal/RadioSporsmalUtbetaling';
import { utbetalingSpørsmål, utbetalingSpørsmålVerdier } from '../../components/sporsmal/sporsmalTekster';
import { ArbeidsgiverInterface } from '../../models/arbeidsgiver';
import { arbeidsgiverNavnPlaceHolder, arbeidsgiverOrgNrPlaceHolder } from './constants';
import { Svaralternativ } from '../../models/sporsmal';
import VidereKnapp from '../../components/knapper/VidereKnapp';
import { post } from '../../data/fetcher/fetcher';

import env from '../../utils/environment';
import { gåTilNesteSide } from '../../utils/navigasjon';
import { useAppStore } from '../../data/stores/app-store';
import { logger } from '../../utils/logger';
import Vis from '../../components/Vis';

interface UtbetalingInterface {
  reisetilskuddId: string;
  utbetalingTilArbeidsgiver?: boolean;
}

const Utbetaling = (): ReactElement => {
  const [
    visningsfeilmeldinger, settVisningsfeilmeldinger,
  ] = useState<FeiloppsummeringFeil[]>([]);
  const {
    activeMegArbeidsgiver,
    utbetalingspørsmålValidert,
    settUtbetalingspørsmålValidert,
  } = useAppStore();
  const [skalViseFeil, settSkalViseFeil] = useState<boolean>(false);

  const { soknadssideID, soknadsID } = useParams();
  const soknadssideIDTall = Number(soknadssideID);
  const getArbeidsgiver = (): ArbeidsgiverInterface => ({
    navn: 'Arbeids- og velferdsetaten',
    orgNr: '392392482849',
  });

  const history = useHistory();

  const leggInnArbeidsGiverIString = (tekstStreng: string) => tekstStreng.replace(
    arbeidsgiverNavnPlaceHolder, getArbeidsgiver().navn,
  ).replace(
    arbeidsgiverOrgNrPlaceHolder, getArbeidsgiver().orgNr,
  );

  const byttUtSpørsmålsTekster = (svaralternativer: Svaralternativ[]): Svaralternativ[] => (
    [...svaralternativer].map((svaralternativ: Svaralternativ) => (
      { ...svaralternativ, label: leggInnArbeidsGiverIString(svaralternativ.label) }
    )));

  const validerUtbetaling = (): FeiloppsummeringFeil[] => {
    if (activeMegArbeidsgiver === '') {
      return [
        {
          skjemaelementId: utbetalingSpørsmål.svaralternativer[0].id,
          feilmelding: 'Du må velge en av alternativene for utbetaling',
        },
      ];
    }
    return [];
  };

  useEffect(() => {
    const valideringsfeil: FeiloppsummeringFeil[] = [];
    const utbetalingFeil = validerUtbetaling();

    valideringsfeil.push(...utbetalingFeil);

    settVisningsfeilmeldinger(valideringsfeil);

    if (valideringsfeil.length < 1) {
      settUtbetalingspørsmålValidert(true);
    } else {
      settUtbetalingspørsmålValidert(false);
    }
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [
    activeMegArbeidsgiver,
    skalViseFeil,
  ]);

  const handleVidereKlikk = () => {
    if (utbetalingspørsmålValidert) {
      post<UtbetalingInterface>(`${env.apiUrl}/reisetilskudd`, {
        reisetilskuddId: soknadsID,
        utbetalingTilArbeidsgiver: activeMegArbeidsgiver === utbetalingSpørsmålVerdier.ARBEIDSGIVER,
      }).then(() => {
        gåTilNesteSide(history, soknadssideIDTall);
      }).catch((error) => {
        logger.error('Feil ved oppdatering av skjema', error);
      });
    } else {
      settSkalViseFeil(true);
    }
  };

  return (
    <>
      <RadioSpørsmålUtbetaling
        tittel={utbetalingSpørsmål.tittel}
        name={utbetalingSpørsmål.name}
        spørsmålstekst={leggInnArbeidsGiverIString(utbetalingSpørsmål.spørsmålstekst)}
        svaralternativer={byttUtSpørsmålsTekster(utbetalingSpørsmål.svaralternativer)}
        id={utbetalingSpørsmål.id}
      />
      <Vis hvis={skalViseFeil && visningsfeilmeldinger.length > 0}>
        <Feiloppsummering tittel="For å gå videre må du rette opp følgende:" feil={visningsfeilmeldinger} />
      </Vis>
      <VidereKnapp
        aktivtSteg={soknadssideIDTall}
        onClick={handleVidereKlikk}
      />
    </>
  );
};

export default Utbetaling;
