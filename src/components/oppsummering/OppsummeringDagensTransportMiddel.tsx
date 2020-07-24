import React, { ReactElement } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { useAppStore } from '../../data/stores/app-store';
import Vis from '../Vis';
import CheckedMedTekst from '../common/checkedMedTekst/CheckedMedTekst';

const OppsummeringDagensTransportmiddel = () : ReactElement => {
  const { dagensTransportmiddelState } = useAppStore();
  return (
    <div className="oppsummering-element oppsummering-dagens-transportmiddel">
      <Undertittel className="oppsummering-underoverskrift">Hvordan reiste du før sykmeldingen?</Undertittel>
      <Vis hvis={dagensTransportmiddelState.transportalternativerPrivat.egenBilChecked}>
        <CheckedMedTekst tekst={`Kjører egen bil, ${dagensTransportmiddelState.antallKilometerSpørsmål} kilometer`} />
      </Vis>
      <Vis hvis={dagensTransportmiddelState.transportalternativerPrivat.gårChecked}>
        <CheckedMedTekst tekst="Går" />
      </Vis>
      <Vis hvis={dagensTransportmiddelState.transportalternativerPrivat.syklerChecked}>
        <CheckedMedTekst tekst="Sykler" />
      </Vis>
      { // TODO: Når checkbox for kollektiv er på plass, bytt ut linja:
        // eslint-disable-next-line max-len
        /* <Vis hvis={dagensTransportmiddelState.transportalternativerPrivat.kollektivChecked && dagensTransportmiddelState.månedligeUtgifterSpørsmål > 0}> */}
      <Vis hvis={dagensTransportmiddelState.månedligeUtgifterSpørsmål > 0}>
        <CheckedMedTekst tekst={`Reiser kollektivt med ${dagensTransportmiddelState.månedligeUtgifterSpørsmål} kroner i månedlige utgifter`} />
      </Vis>
    </div>
  );
};

export default OppsummeringDagensTransportmiddel;
