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
}

export interface CheckboxProps {
  tittel: string;
  svaralternativer: Svaralternativ[];
}
