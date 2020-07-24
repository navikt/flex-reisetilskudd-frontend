import {
  RadioSpørsmålProps, CheckboxProps, InputProps, VeilederProps,
} from '../../types/types';
import { arbeidsgiverNavnPlaceHolder, arbeidsgiverOrgNrPlaceHolder } from '../../pages/utbetaling/constants';

export const utbetalingSpørsmålVerdier = {
  NAME: 'UTBETALINGARBEIDSGIVER',
  MEG: 'MEG',
  ARBEIDSGIVER: 'ARBEIDSGIVER',
};

export const utbetalingSpørsmål: RadioSpørsmålProps = {
  tittel: 'Utbetaling til arbeidsgiver',
  name: utbetalingSpørsmålVerdier.NAME,
  spørsmålstekst: `Skal reisetilskuddet utbetales til deg eller til ${arbeidsgiverNavnPlaceHolder} (org.nr. ${arbeidsgiverOrgNrPlaceHolder})?`,
  svaralternativer: [
    {
      label: 'Meg',
      value: utbetalingSpørsmålVerdier.MEG,
    },
    {
      label: `${arbeidsgiverNavnPlaceHolder}`,
      value: utbetalingSpørsmålVerdier.ARBEIDSGIVER,
    },
  ],
  id: 'utbetaling-offentlig-privat-sporsmal',
};

export const offentligPrivatVerdier = {
  NAME: 'TRANSPORTMIDDEL',
  OFFENTLIG: 'OFFENTLIG',
  PRIVAT: 'PRIVAT',
};

export const offentligPrivatSpørsmål: RadioSpørsmålProps = {
  tittel: 'Transportmiddel til daglig',
  name: offentligPrivatVerdier.NAME,
  spørsmålstekst: 'Hva slags transportmiddel bruker du til daglig?',
  svaralternativer: [
    {
      label: 'Offentlig',
      value: offentligPrivatVerdier.OFFENTLIG,
    },
    {
      label: 'Privat',
      value: offentligPrivatVerdier.PRIVAT,
    },
  ],
  id: 'dagens-transportmiddel-offentlig-privat-sporsmal',
};

export const transportalternativerPrivatVerdier = {
  GÅR: 'GÅR',
  SYKLER: 'SYKLER',
  KOLLEKTIVTRANSPORT: 'KOLLEKTIVTRANSPORT',
  EGEN_BIL: 'EGEN BIL',
};

export const transportalternativerPrivat: CheckboxProps = {
  tittel: 'Velg fremkomstmiddel',
  svaralternativer: [
    {
      label: 'Går',
      value: transportalternativerPrivatVerdier.GÅR,
    },
    {
      label: 'Sykler',
      value: transportalternativerPrivatVerdier.SYKLER,
    },
    {
      label: 'Kollektivtransport',
      value: transportalternativerPrivatVerdier.KOLLEKTIVTRANSPORT,
    },
    {
      label: 'Egen bil',
      value: transportalternativerPrivatVerdier.EGEN_BIL,
    },
  ],
  id: 'dagens-transportmiddel-transportalternativer-privat',
};

export const antallKilometerSpørsmål: InputProps = {
  tittel: 'Antall kilometer fra bosted til arbeid',
  inputMode: 'numeric',
  feil: 'Her er det noe feil',
  bredde: 'S',
  id: 'dagens-transportmiddel-kilometer-input',
};

export const månedligeUtgifterSpørsmål: InputProps = {
  tittel: 'Månedlige utgifter til offentlig transport',
  inputMode: 'numeric',
  feil: 'Her er det noe feil',
  bredde: 'S',
  id: 'dagens-transportmiddel-manedlige-utgifter-input',
};

export const transportVeileder: VeilederProps = {
  hjelpetekst: 'Offentlig transport regnes som kollektiv transport, taxi, bysykler, elsparkesykkel.',
};
