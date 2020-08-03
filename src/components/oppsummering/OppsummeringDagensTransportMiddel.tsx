import React, { ReactElement } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { useAppStore } from '../../data/stores/app-store';
import Vis from '../Vis';
import CheckedMedTekst from '../common/checkedMedTekst/CheckedMedTekst';

const OppsummeringDagensTransportmiddel = () : ReactElement => {
  const {
    dagensTransportMiddelEgenBilChecked,
    dagensTransportMiddelSyklerChecked,
    dagensTransportMiddelGårChecked,
    dagensTransportMiddelKollektivChecked,
    månedligeUtgifterState,
    antallKilometerState,
  } = useAppStore();
  return (
    <div className="oppsummering-element oppsummering-dagens-transportmiddel">
      <Undertittel className="oppsummering-underoverskrift">Hvordan reiste du før sykmeldingen?</Undertittel>
      <Vis hvis={
        dagensTransportMiddelEgenBilChecked
      }
      >
        <CheckedMedTekst tekst={`Kjører egen bil, ${antallKilometerState} kilometer`} />
      </Vis>
      <Vis hvis={dagensTransportMiddelGårChecked}>
        <CheckedMedTekst tekst="Går" />
      </Vis>
      <Vis hvis={dagensTransportMiddelSyklerChecked}>
        <CheckedMedTekst tekst="Sykler" />
      </Vis>
      <Vis hvis={
        dagensTransportMiddelKollektivChecked
      }
      >
        <CheckedMedTekst tekst={`Reiser kollektivt med ${månedligeUtgifterState} kroner i månedlige utgifter`} />
      </Vis>
    </div>
  );
};

export default OppsummeringDagensTransportmiddel;
