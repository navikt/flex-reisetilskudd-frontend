export interface IVedlegg {
  navn: string;
  størrelse: number;
  beløp?: number;
  dato?: Date;
  dokumentId?: string;
}

export interface IOpplastetVedlegg {
  dokumentId: string;
}
