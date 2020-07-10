import { RadioSpørsmålProps } from '../../../types/types';

export const jaNeiSpørsmålUtbetaling: RadioSpørsmålProps = {
  tittel: 'Utbetaling til arbeidsgiver',
  name: 'UtbetalingArbeidsgiver',
  spørsmålstekst: 'Skal reisetilskuddet utbetales til arbeidsgiver?',
  hjelpetekst: '',
  svaralternativer: [
    {
      label: 'Ja',
      value: 'JA',
      id: 'Ja',
    },
    {
      label: 'Nei',
      value: 'NEI',
      id: 'Nei',
    },
  ],
};

export const offentligPrivatSpørsmål: RadioSpørsmålProps = {
  tittel: 'Transportmiddel til daglig',
  name: 'Transportmiddel',
  spørsmålstekst: 'Hva slags transportmiddel bruker du til daglig?',
  hjelpetekst: '',
  svaralternativer: [
    {
      label: 'Offentlig',
      value: 'OFFENTLIG',
      id: 'Offentlig',
    },
    {
      label: 'Privat',
      value: 'PRIVAT',
      id: 'Privat',
    },
  ],
};
