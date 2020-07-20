export interface VedleggInterface {
  id: string;
  navn: string;
  størrelse: number;
  beløp?: number;
  dato?: Date;
  dokumentId?: string;
}

export interface OpplastetVedleggInterface {
  dokumentId: string;
}
