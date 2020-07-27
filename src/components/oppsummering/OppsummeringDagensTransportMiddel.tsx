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
      <Vis hvis={
        dagensTransportmiddelState.transportalternativer.egenBilChecked
        && dagensTransportmiddelState.antallKilometerSpørsmål > 0
      }
      >
        <CheckedMedTekst tekst={`Kjører egen bil, ${dagensTransportmiddelState.antallKilometerSpørsmål} kilometer`} />
      </Vis>
      <Vis hvis={dagensTransportmiddelState.transportalternativer.gårChecked}>
        <CheckedMedTekst tekst="Går" />
      </Vis>
      <Vis hvis={dagensTransportmiddelState.transportalternativer.syklerChecked}>
        <CheckedMedTekst tekst="Sykler" />
      </Vis>
      <Vis hvis={
        dagensTransportmiddelState.transportalternativer.kollektivtransportChecked
        && dagensTransportmiddelState.månedligeUtgifterSpørsmål > 0
      }
      >
        <CheckedMedTekst tekst={`Reiser kollektivt med ${dagensTransportmiddelState.månedligeUtgifterSpørsmål} kroner i månedlige utgifter`} />
      </Vis>
    </div>
  );
};

export default OppsummeringDagensTransportmiddel;
