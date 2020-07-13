import React from 'react';
import RadioSpørsmål from '../../components/sporsmal/radioSpørsmål/RadioSpørsmål';
import { utbetalingSpørsmål } from '../../components/sporsmal/spørsmålTekster';

const Utbetaling = () => (
  <>
    {RadioSpørsmål(utbetalingSpørsmål)}
  </>
);

export default Utbetaling;
