import React, { ReactElement, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FeiloppsummeringFeil, Feiloppsummering } from 'nav-frontend-skjema';
import RadioSpørsmålUtbetaling from '../../components/sporsmal/radioSporsmal/RadioSporsmalUtbetaling';
import { utbetalingSpørsmål } from '../../components/sporsmal/sporsmalTekster';
import { ArbeidsgiverInterface } from '../../models/arbeidsgiver';
import { arbeidsgiverNavnPlaceHolder, arbeidsgiverOrgNrPlaceHolder } from './constants';
import { Svaralternativ } from '../../types/types';
import VidereKnapp from '../../components/knapper/VidereKnapp';
import { useAppStore } from '../../data/stores/app-store';
import Vis from '../../components/Vis';

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
  const [gårTilNesteSide, settGårTilNesteSide] = useState<boolean>(false);

  const { soknadssideID } = useParams();
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
  }, [activeMegArbeidsgiver,
    skalViseFeil]);

  const handleVidereKlikk = () => {
    settSkalViseFeil(true);

    if (utbetalingspørsmålValidert) {
      settGårTilNesteSide(true);
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
        skalGåTilNesteSideNå={gårTilNesteSide}
      />
    </>
  );
};

export default Utbetaling;
