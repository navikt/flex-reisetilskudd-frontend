import React, { ReactElement } from 'react';
import RadioSpørsmålUtbetaling from '../../components/sporsmal/radioSporsmal/RadioSpørsmålUtbetaling';
import { utbetalingSpørsmål } from '../../components/sporsmal/spørsmålTekster';

const Utbetaling = (): ReactElement => (
  <>
    {RadioSpørsmålUtbetaling(utbetalingSpørsmål)}
  </>
);

export default Utbetaling;
