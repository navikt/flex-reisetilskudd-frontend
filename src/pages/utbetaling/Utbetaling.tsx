import React, { ReactElement } from 'react';
import RadioSpørsmålUtbetaling from '../../components/sporsmal/radioSpørsmål/RadioSpørsmålUtbetaling';
import { utbetalingSpørsmål } from '../../components/sporsmal/spørsmålTekster';
import { ArbeidsgiverInterface } from '../../models/arbeidsgiver';
import { arbeidsgiverNavnPlaceHolder, arbeidsgiverOrgNrPlaceHolder } from './constants';
import { Svaralternativ } from '../../types/types';

const Utbetaling = (): ReactElement => {
  const getArbeidsgiver = () : ArbeidsgiverInterface => ({
    navn: 'Arbeids- og velferdsetaten',
    orgNr: '392392482849',
  });

  const leggInnArbeidsGiverIString = (tekstStreng : string) => tekstStreng.replace(
    arbeidsgiverNavnPlaceHolder, getArbeidsgiver().navn,
  ).replace(
    arbeidsgiverOrgNrPlaceHolder, getArbeidsgiver().orgNr,
  );

  const byttUtSpørsmålsTekster = (svaralternativer : Svaralternativ[]) : Svaralternativ[] => {
    const nyeAlternativer = [...svaralternativer];
    nyeAlternativer.forEach((svaralternativ : Svaralternativ) => {
      // TODO: Finne ut hvordan man kan gjøre dette uten å suppresse no-param-reassign
      // return {...svaralternativ, label: leggInnArbeidsGiverIString(svaralternativ.label)};
      // eslint-disable-next-line no-param-reassign
      svaralternativ.label = leggInnArbeidsGiverIString(svaralternativ.label);
    });
    return nyeAlternativer;
  };

  return (
    <RadioSpørsmålUtbetaling
      tittel={utbetalingSpørsmål.tittel}
      name={utbetalingSpørsmål.name}
      spørsmålstekst={leggInnArbeidsGiverIString(utbetalingSpørsmål.spørsmålstekst)}
      svaralternativer={byttUtSpørsmålsTekster(utbetalingSpørsmål.svaralternativer)}
    />
  );
};

export default Utbetaling;
