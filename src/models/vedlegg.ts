export interface Vedlegg {
  id: string;
  navn: string;
  størrelse: number;
  beløp?: number;
  dato?: Date;
  dokumentId?: string;
}

export interface OpplastetVedlegg {
  dokumentId: string;
}
