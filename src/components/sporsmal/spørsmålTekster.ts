import {
  RadioSpørsmålProps, CheckboxProps, InputProps,
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
      id: 'utbetaling-meg',
    },
    {
      label: `${arbeidsgiverNavnPlaceHolder}`,
      value: utbetalingSpørsmålVerdier.ARBEIDSGIVER,
      id: 'utbetaling-arbeidsgiver',
    },
  ],
  id: 'utbetaling-sporsmal',
};

export const transportalternativerVerdier = {
  GÅR: 'GÅR',
  SYKLER: 'SYKLER',
  KOLLEKTIVTRANSPORT: 'KOLLEKTIVTRANSPORT',
  EGEN_BIL: 'EGEN BIL',
};

export const transportalternativer: CheckboxProps = {
  tittel: 'Velg transportmiddel',
  svaralternativer: [
    {
      label: 'Går',
      value: transportalternativerVerdier.GÅR,
      id: 'transport-går',
    },
    {
      label: 'Sykler',
      value: transportalternativerVerdier.SYKLER,
      id: 'transport-sykler',
    },
    {
      label: 'Egen bil',
      value: transportalternativerVerdier.EGEN_BIL,
      id: 'transport-egen-bil',
    },
  ],
  id: 'dagens-transportmiddel-transportalternativer',
};

export const transportalternativerKollektivt: CheckboxProps = {
  tittel: '',
  svaralternativer: [
    {
      label: 'Kollektivtransport',
      value: transportalternativerVerdier.KOLLEKTIVTRANSPORT,
      id: 'transport-kollektiv',
    },
  ],
  id: 'dagens-transportmiddel-transportalternativer-kollektivt',
};

export const antallKilometerSpørsmål: InputProps = {
  tittel: 'Antall kilometer fra bosted til arbeid',
  inputMode: 'numeric',
  bredde: 'S',
  id: 'dagens-transportmiddel-kilometer-input',
};

export const månedligeUtgifterSpørsmål: InputProps = {
  tittel: 'Månedlige utgifter til offentlig transport',
  inputMode: 'numeric',
  bredde: 'S',
  id: 'dagens-transportmiddel-månedlige-utgifter-input',
};
