export interface Svaralternativ {
  label: string,
  value: string,
  id: string,
}

export interface RadioSpørsmålProps {
  tittel: string,
  name: string,
  spørsmålstekst: string,
  hjelpetekst?: string,
  svaralternativer: Svaralternativ[],
  feil?: string;
  id: string,
}

export interface CheckboxProps {
  tittel: string;
  svaralternativer: Svaralternativ[];
  id: string;
  validerSkjema?: (hvilkenCheckbox?: string | null, nyVerdi?: string | null) => void;
}

export interface InputProps {
  tittel: string;
  inputMode: 'numeric';
  feil?: string;
  bredde: 'S';
  value?: number | string | undefined;
  onChange?: (s: string) => void;
  id: string;
}
