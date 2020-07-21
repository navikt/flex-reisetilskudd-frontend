import {
  DagensTransportmiddelCheckboxStateEnum,
  DagensTransportmiddelSvarInterface, NummerInputStateEnum,
} from '../../models/dagenstransportmiddel';
import { offentligPrivatVerdier } from './spørsmålTekster';

const fåKopiState = (dagensTransportmiddelState : DagensTransportmiddelSvarInterface) => (
  { ...dagensTransportmiddelState }
);

export const endreCheckboxVerdi = (
  hvilkenCheckbox : DagensTransportmiddelCheckboxStateEnum,
  nyVerdi : boolean,
  dagensTransportmiddelState : DagensTransportmiddelSvarInterface,
  settDagensTransportmiddelState : (d : DagensTransportmiddelSvarInterface) => void,
) : void => {
  const nyState = fåKopiState(dagensTransportmiddelState);
  nyState.transportalternativerPrivat[hvilkenCheckbox] = nyVerdi;
  settDagensTransportmiddelState(nyState);
};

export const endreOffentligPrivatRadioVerdi = (
  nyVerdi : string,
  dagensTransportmiddelState : DagensTransportmiddelSvarInterface,
  settDagensTransportmiddelState : (d : DagensTransportmiddelSvarInterface) => void,
) : void => {
  const nyState = fåKopiState(dagensTransportmiddelState);
  nyState.offentligPrivatSpørsmål = nyVerdi;

  if (nyVerdi === offentligPrivatVerdier.OFFENTLIG) {
    nyState.transportalternativerPrivat.egenBilChecked = false;
    nyState.transportalternativerPrivat.gårChecked = false;
    nyState.transportalternativerPrivat.syklerChecked = false;
    nyState.månedligeUtgifterSpørsmål = '';
  } else if (nyVerdi === offentligPrivatVerdier.PRIVAT) {
    nyState.antallKilometerSpørsmål = '';
  }
  settDagensTransportmiddelState(nyState);
};

export const endreInputVerdi = (
  hvilkenVerdi : NummerInputStateEnum,
  nyVerdi : string,
  dagensTransportmiddelState : DagensTransportmiddelSvarInterface,
  settDagensTransportmiddelState : (d : DagensTransportmiddelSvarInterface) => void,
) : void => {
  const nyState = fåKopiState(dagensTransportmiddelState);
  nyState[hvilkenVerdi] = nyVerdi;
  settDagensTransportmiddelState(nyState);
};
