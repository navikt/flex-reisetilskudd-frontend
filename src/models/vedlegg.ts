export interface IVedlegg {
  navn: string;
  størrelse: number;
  dokumentId?: string;
}

export interface IOpplastetVedlegg {
  dokumentId: string;
}
