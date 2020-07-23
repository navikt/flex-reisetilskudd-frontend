export enum SykmeldingOpplysningEnum {
  FRA_DATO= 'fraDato',
  TIL_DATO= 'tilDato',
  DIAGNOSE= 'diagnose',
  BI_DIAGNOSER= 'bidiagnoser',
  REISETILSKUDD= 'reisetilskudd',
  BESKRIV_HENSYN= 'beskrivHensyn',
  ARBEIDSGIVER= 'arbeidsgiver',
  SYKMELDER= 'sykmelder',
  AKTIVITET_IKKE_MULIG_434= 'aktivitetIkkeMulig434',
}

export interface SykmeldingOpplysningInterface {
  [SykmeldingOpplysningEnum.FRA_DATO]: string;
  [SykmeldingOpplysningEnum.TIL_DATO]: string;
  [SykmeldingOpplysningEnum.DIAGNOSE]: string;
  [SykmeldingOpplysningEnum.BI_DIAGNOSER]: string;
  [SykmeldingOpplysningEnum.REISETILSKUDD]: string;
  [SykmeldingOpplysningEnum.BESKRIV_HENSYN]: string;
  [SykmeldingOpplysningEnum.ARBEIDSGIVER]: string;
  [SykmeldingOpplysningEnum.SYKMELDER]: string;
  [SykmeldingOpplysningEnum.AKTIVITET_IKKE_MULIG_434]: string;
}
