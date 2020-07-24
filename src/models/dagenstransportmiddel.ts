export interface DagensTransportmiddelSvarInterface {
  // TODO: få putta inn konstantene for offentligPrivatSpørsmål
  transportalternativer: {
    egenBilChecked: boolean,
    syklerChecked: boolean,
    gårChecked: boolean,
    kollektivtransportChecked: boolean
  },
  månedligeUtgifterSpørsmål: number | string,
  antallKilometerSpørsmål: number | string,
}

export const dagensTransportmiddelStateDefault: DagensTransportmiddelSvarInterface = {
  transportalternativer: {
    egenBilChecked: false,
    gårChecked: false,
    syklerChecked: false,
    kollektivtransportChecked: false,
  },
  månedligeUtgifterSpørsmål: '',
  antallKilometerSpørsmål: '',
};

export enum DagensTransportmiddelCheckboxStateEnum {
  egenBilChecked = 'egenBilChecked',
  syklerChecked = 'syklerChecked',
  gårChecked = 'gårChecked',
  kollektivtransportChecked = 'kollektivtransportChecked',
}

export enum NummerInputStateEnum {
  månedligeUtgifterSpørsmål = 'månedligeUtgifterSpørsmål',
  antallKilometerSpørsmål = 'antallKilometerSpørsmål',
}
