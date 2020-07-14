import React, { ReactElement } from 'react';
import RadioSpørsmål from '../../components/sporsmal/radioSpørsmål/RadioSpørsmål';
import { utbetalingSpørsmål } from '../../components/sporsmal/spørsmålTekster';

const Utbetaling = (): ReactElement => (
  <>
    {RadioSpørsmål(utbetalingSpørsmål)}
  </>
);

export default Utbetaling;
