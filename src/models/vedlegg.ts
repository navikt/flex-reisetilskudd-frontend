export interface VedleggInterface {
  navn: string;
  størrelse: number;
  beløp?: number;
  dato?: Date;
  dokumentId?: string;
}

export interface OpplastetVedleggInterface {
  dokumentId: string;
}
