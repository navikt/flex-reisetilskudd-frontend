import {
  DagensTransportmiddelCheckboxStateEnum,
  DagensTransportmiddelSvarInterface,
} from '../../../models/dagenstransportmiddel';

const fåKopiState = (dagensTransportmiddelState : DagensTransportmiddelSvarInterface) => (
  { ...dagensTransportmiddelState }
);

const endreCheckboxVerdi = (
  hvilkenCheckbox : DagensTransportmiddelCheckboxStateEnum,
  nyVerdi : boolean,
  dagensTransportmiddelState : DagensTransportmiddelSvarInterface,
  settDagensTransportmiddelState : (d : DagensTransportmiddelSvarInterface) => void,
) : void => {
  const nyState = fåKopiState(dagensTransportmiddelState);
  nyState.transportalternativerPrivat[hvilkenCheckbox] = nyVerdi;
  settDagensTransportmiddelState(nyState);
};

export default endreCheckboxVerdi;
