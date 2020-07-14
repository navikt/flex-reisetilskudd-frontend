import {
  RadioSpørsmålProps, CheckboxProps, InputProps, VeilederProps,
} from '../../types/types';

export const utbetalingSpørsmål: RadioSpørsmålProps = {
  tittel: 'Utbetaling til arbeidsgiver',
  name: 'UtbetalingArbeidsgiver',
  spørsmålstekst: 'Skal reisetilskuddet utbetales til deg eller til <SETT-INN-ARBEIDSGIVER>?',
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
  tittel: 'Velg fremkomstmiddel',
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

export const antallKilometerSpørsmål: InputProps = {
  tittel: 'Antall kilometer fra bosted til arbeid',
  inputMode: 'numeric',
  feil: 'Her er det noe feil',
  bredde: 'S',
};

export const månedligeUtgifterSpørsmål: InputProps = {
  tittel: 'Månedlige utgifter til offentlig transport',
  inputMode: 'numeric',
  feil: 'Her er det noe feil',
  bredde: 'S',
};

export const transportVeileder: VeilederProps = {
  hjelpetekst: 'Offentlig transport regnes som kollektiv transport, taxi, bysykler, el-scooter.',
};
