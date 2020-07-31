import React, { ReactElement, useState } from 'react';
import { useParams } from 'react-router-dom';
import RadioSpørsmålUtbetaling from '../../components/sporsmal/radioSporsmal/RadioSporsmalUtbetaling';
import { utbetalingSpørsmål, utbetalingSpørsmålVerdier } from '../../components/sporsmal/spørsmålTekster';
import { ArbeidsgiverInterface } from '../../models/arbeidsgiver';
import { arbeidsgiverNavnPlaceHolder, arbeidsgiverOrgNrPlaceHolder } from './constants';
import { Svaralternativ } from '../../types/types';
import VidereKnapp from '../../components/knapper/VidereKnapp';
import { post } from '../../data/fetcher/fetcher';
import env from '../../utils/environment';
import { useAppStore } from '../../data/stores/app-store';
import { logger } from '../../utils/logger';

interface UtbetalingInterface {
  reisetilskuddId: string;
  utbetalingTilArbeidsgiver?: boolean;
}

const Utbetaling = (): ReactElement => {
  const [gårTilNesteSide, settGårTilNesteSide] = useState<boolean>(false);

  const { activeMegArbeidsgiver } = useAppStore();

  const { soknadssideID, soknadsID } = useParams();
  const soknadssideIDTall = Number(soknadssideID);

  const getArbeidsgiver = (): ArbeidsgiverInterface => ({
    navn: 'Arbeids- og velferdsetaten',
    orgNr: '392392482849',
  });

  const leggInnArbeidsGiverIString = (tekstStreng: string) => tekstStreng.replace(
    arbeidsgiverNavnPlaceHolder, getArbeidsgiver().navn,
  ).replace(
    arbeidsgiverOrgNrPlaceHolder, getArbeidsgiver().orgNr,
  );

  const byttUtSpørsmålsTekster = (svaralternativer: Svaralternativ[]): Svaralternativ[] => (
    [...svaralternativer].map((svaralternativ: Svaralternativ) => (
      { ...svaralternativ, label: leggInnArbeidsGiverIString(svaralternativ.label) }
    )));

  const handleVidereKlikk = () => {
    post<UtbetalingInterface>(`${env.apiUrl}/reisetilskudd`, {
      reisetilskuddId: soknadsID,
      utbetalingTilArbeidsgiver: activeMegArbeidsgiver === utbetalingSpørsmålVerdier.ARBEIDSGIVER,
    }).then(() => {
      settGårTilNesteSide(true);
    }).catch((error) => {
      logger.error('Feil ved oppdatering av skjema', error);
    });
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
      <VidereKnapp
        aktivtSteg={soknadssideIDTall}
        onClick={handleVidereKlikk}
        skalGåTilNesteSideNå={gårTilNesteSide}
      />
    </>
  );
};

export default Utbetaling;
