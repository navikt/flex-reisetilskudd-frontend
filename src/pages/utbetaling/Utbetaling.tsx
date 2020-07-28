import React, { ReactElement } from 'react';
import RadioSpørsmålUtbetaling from '../../components/sporsmal/radioSporsmal/RadioSporsmalUtbetaling';
import { utbetalingSpørsmål } from '../../components/sporsmal/sporsmalTekster';
import { ArbeidsgiverInterface } from '../../models/arbeidsgiver';
import { arbeidsgiverNavnPlaceHolder, arbeidsgiverOrgNrPlaceHolder } from './constants';
import { Svaralternativ } from '../../types/types';

const Utbetaling = (): ReactElement => {
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

  return (
    <RadioSpørsmålUtbetaling
      tittel={utbetalingSpørsmål.tittel}
      name={utbetalingSpørsmål.name}
      spørsmålstekst={leggInnArbeidsGiverIString(utbetalingSpørsmål.spørsmålstekst)}
      svaralternativer={byttUtSpørsmålsTekster(utbetalingSpørsmål.svaralternativer)}
      id={utbetalingSpørsmål.id}
    />
  );
};

export default Utbetaling;
