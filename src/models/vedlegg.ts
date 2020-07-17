export interface Vedlegg {
  navn: string;
  størrelse: number;
  beløp?: number;
  dato?: Date;
  dokumentId?: string;
}

export interface OpplastetVedlegg {
  dokumentId: string;
}
