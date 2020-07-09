import { ReactElement } from 'react';
import RadioSpørsmål from '../../components/sporsmal/radioSpørsmål/RadioSpørsmål';
import { offentligPrivatSpørsmål } from '../../components/sporsmal/radioSpørsmål/radioSpørsmålTekster';

function Utbetaling(): ReactElement {
  return RadioSpørsmål(offentligPrivatSpørsmål);
}

export default Utbetaling;
