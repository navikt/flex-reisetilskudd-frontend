import { ReactElement } from 'react';
import RadioSpørsmål from '../../components/sporsmal/radioSpørsmål/RadioSpørsmål';
import { jaNeiSpørsmålUtbetaling } from '../../components/sporsmal/radioSpørsmål/radioSpørsmålTekster';

function Utbetaling(): ReactElement {
  return RadioSpørsmål(jaNeiSpørsmålUtbetaling);
}

export default Utbetaling;
