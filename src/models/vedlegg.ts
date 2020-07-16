export interface IVedlegg {
  navn: string;
  størrelse: number;
  beløp?: number;
  dokumentId?: string;
  dato?: Date;
}

export interface IOpplastetVedlegg {
  dokumentId: string;
}
