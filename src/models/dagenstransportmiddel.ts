export interface DagensTransportmiddelSvarInterface {
  offentligPrivatSpørsmål: string | undefined,
  månedligeUtgifterSpørsmål: number | undefined,
  transportalternativerPrivat: {
    egenBilChecked: boolean,
    syklerChecked: boolean,
    gårChecked: boolean
  },
  antallKilometerSpørsmål: number | undefined,
}

export const dagensTransportmiddelStateDefault : DagensTransportmiddelSvarInterface = {
  offentligPrivatSpørsmål: undefined,
  månedligeUtgifterSpørsmål: undefined,
  transportalternativerPrivat: {
    egenBilChecked: false,
    gårChecked: false,
    syklerChecked: false,
  },
  antallKilometerSpørsmål: undefined,
};

export enum DagensTransportmiddelCheckboxStateEnum {
  egenBilChecked = 'egenBilChecked',
  syklerChecked = 'syklerChecked',
  gårChecked = 'gårChecked',
}
