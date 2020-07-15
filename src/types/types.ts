export interface Svaralternativ {
  label: string,
  value: string,
}

export interface RadioSpørsmålProps {
  tittel: string,
  name: string,
  spørsmålstekst: string,
  hjelpetekst?: string,
  svaralternativer: Svaralternativ[],
}

export interface CheckboxProps {
  tittel: string;
  svaralternativer: Svaralternativ[];
}

export interface InputProps {
  tittel: string;
  inputMode: 'numeric';
  feil?: string;
  bredde: 'S';
}

export interface VeilederProps {
  hjelpetekst: string;
}
