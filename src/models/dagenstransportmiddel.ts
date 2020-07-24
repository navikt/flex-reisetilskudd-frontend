export interface DagensTransportmiddelSvarInterface {
  // TODO: få putta inn konstantene for offentligPrivatSpørsmål
  offentligPrivatSpørsmål: string | undefined,
  månedligeUtgifterSpørsmål: number | string,
  transportalternativerPrivat: {
    egenBilChecked: boolean,
    syklerChecked: boolean,
    gårChecked: boolean,
    kollektivtransportChecked: boolean
  },
  antallKilometerSpørsmål: number | string,
}

export const dagensTransportmiddelStateDefault: DagensTransportmiddelSvarInterface = {
  offentligPrivatSpørsmål: undefined,
  månedligeUtgifterSpørsmål: '',
  transportalternativerPrivat: {
    egenBilChecked: false,
    gårChecked: false,
    syklerChecked: false,
    kollektivtransportChecked: false,
  },
  antallKilometerSpørsmål: '',
};

export enum DagensTransportmiddelCheckboxStateEnum {
  egenBilChecked = 'egenBilChecked',
  syklerChecked = 'syklerChecked',
  gårChecked = 'gårChecked',
  kollektivtransportChecked = 'kollektivtransportChecked',
}

export enum NummerInputStateEnum {
  antallKilometerSpørsmål = 'antallKilometerSpørsmål',
  månedligeUtgifterSpørsmål = 'månedligeUtgifterSpørsmål',
}
