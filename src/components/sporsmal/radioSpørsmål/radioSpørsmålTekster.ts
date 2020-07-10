import { RadioSpørsmålProps } from '../../../types/types';

export const jaNeiSpørsmål: RadioSpørsmålProps = {
  tittel: 'Test',
  name: 'Test',
  spørsmålstekst: 'Vi tester',
  hjelpetekst: '',
  svaralternativer: [
    {
      label: 'Tja',
      value: 'Tja',
      id: 'Tja',
    },
    {
      label: 'Nei',
      value: 'Nei',
      id: 'Nei',
    },
    {
      label: 'Ja',
      value: 'Ja',
      id: 'Ja',
    },
    {
      label: 'Jo',
      value: 'Jo',
      id: 'Jo',
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
