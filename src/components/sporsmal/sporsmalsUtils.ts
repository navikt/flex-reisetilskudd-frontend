import {
  DagensTransportmiddelCheckboxStateEnum,
  DagensTransportmiddelSvarInterface, NummerInputStateEnum,
} from '../../models/dagenstransportmiddel';

const fåKopiState = (dagensTransportmiddelState: DagensTransportmiddelSvarInterface) => (
  { ...dagensTransportmiddelState }
);

export const endreCheckboxVerdi = (
  hvilkenCheckbox: DagensTransportmiddelCheckboxStateEnum,
  nyVerdi: boolean,
  dagensTransportmiddelState: DagensTransportmiddelSvarInterface,
  settDagensTransportmiddelState: (d: DagensTransportmiddelSvarInterface) => void,
): void => {
  const nyState = fåKopiState(dagensTransportmiddelState);
  nyState.transportalternativer[hvilkenCheckbox] = nyVerdi;
  settDagensTransportmiddelState(nyState);
};

export const endreInputVerdi = (
  hvilkenVerdi: NummerInputStateEnum,
  nyVerdi: string,
  dagensTransportmiddelState: DagensTransportmiddelSvarInterface,
  settDagensTransportmiddelState: (d: DagensTransportmiddelSvarInterface) => void,
): void => {
  const nyState = fåKopiState(dagensTransportmiddelState);
  nyState[hvilkenVerdi] = nyVerdi;
  settDagensTransportmiddelState(nyState);
};
