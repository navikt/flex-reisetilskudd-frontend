import { RadioSpørsmålProps, CheckboxProps } from '../../types/types';

export const utbetalingSpørsmål: RadioSpørsmålProps = {
  tittel: 'Utbetaling til arbeidsgiver',
  name: 'UtbetalingArbeidsgiver',
  spørsmålstekst: 'Skal reisetilskuddet utbetales til deg eller til <SETT-INN-ARBEIDSGIVER',
  svaralternativer: [
    {
      label: 'Meg',
      value: 'MEG',
      id: 'Meg',
    },
    {
      label: '<SETT-INN-ARBEIDSGIVER>',
      value: 'ARBEIDSGIVER',
      id: 'Arbeidsgiver',
    },
  ],
};

export const offentligPrivatSpørsmål: RadioSpørsmålProps = {
  tittel: 'Transportmiddel til daglig',
  name: 'Transportmiddel',
  spørsmålstekst: 'Hva slags transportmiddel bruker du til daglig?',
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

export const transportAlternativerPrivat: CheckboxProps = {
  tittel: 'Fremkomstmiddel',
  svaralternativer: [
    {
      label: 'Går',
      value: 'GÅR',
      id: 'Går',
    },
    {
      label: 'Sykler',
      value: 'SYKLER',
      id: 'Sykler',
    },
    {
      label: 'Egen bil',
      value: 'EGEN BIL',
      id: 'EgenBil',
    },
  ],
};
