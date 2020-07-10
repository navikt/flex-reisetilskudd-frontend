import { ReactElement } from 'react';
import RadioSpørsmål from '../../components/sporsmal/radioSpørsmål/RadioSpørsmål';
import { offentligPrivatSpørsmål } from '../../components/sporsmal/radioSpørsmål/radioSpørsmålTekster';

function DagensTransportmiddel(): ReactElement {
  return RadioSpørsmål(offentligPrivatSpørsmål);
}

export default DagensTransportmiddel;
