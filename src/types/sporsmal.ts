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
    bredde: 'fullbredde' | 'XXL' | 'XL' | 'L' | 'M' | 'S' | 'XS' | 'XXS';
    value?: number | string | undefined;
    onChange?: (s: string) => void;
    id: string;
    feil?: string;
}
