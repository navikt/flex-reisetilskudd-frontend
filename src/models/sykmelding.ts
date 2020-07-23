export enum SykmeldingOpplysningEnum {
  FRA_DATO= 'fraDato',
  TIL_DATO= 'tilDato',
  DIAGNOSE= 'diagnose',
  BI_DIAGNOSE= 'bidiagnose',
  BESKRIV_FRAVÆR= 'beskrivFraver',
  BESKRIV_HENSYN= 'beskrivHensyn',
  ARBEIDSGIVER= 'arbeidsgiver',
  SYKMELDER= 'sykmelder',
  AKTIVITET_IKKE_MULIG_434= 'aktivitetIkkeMulig434',
}

export interface SykmeldingOpplysningInterface {
  [SykmeldingOpplysningEnum.FRA_DATO]: string;
  [SykmeldingOpplysningEnum.TIL_DATO]: string;
  [SykmeldingOpplysningEnum.DIAGNOSE]: string;
  [SykmeldingOpplysningEnum.BI_DIAGNOSE]: string;
  [SykmeldingOpplysningEnum.BESKRIV_FRAVÆR]: string;
  [SykmeldingOpplysningEnum.BESKRIV_HENSYN]: string;
  [SykmeldingOpplysningEnum.ARBEIDSGIVER]: string;
  [SykmeldingOpplysningEnum.SYKMELDER]: string;
  [SykmeldingOpplysningEnum.AKTIVITET_IKKE_MULIG_434]: string;
}
