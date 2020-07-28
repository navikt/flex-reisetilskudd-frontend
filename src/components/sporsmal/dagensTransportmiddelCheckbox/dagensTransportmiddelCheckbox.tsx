import React, { ReactElement } from 'react';
import { CheckboksPanelGruppe } from 'nav-frontend-skjema';
import { CheckboxProps } from '../../../types/types';
import 'nav-frontend-skjema-style';
import { useAppStore } from '../../../data/stores/app-store';
import { transportalternativerVerdier } from '../sporsmalTekster';

const DagensTransportmiddelCheckbox = (
  { tittel, svaralternativer, id }: CheckboxProps,
): ReactElement => {
  const {
    dagensTransportMiddelEgenBilChecked, settDagensTransportMiddelEgenBilChecked,
    dagensTransportMiddelSyklerChecked, settDagensTransportMiddelSyklerChecked,
    dagensTransportMiddelGårChecked, settDagensTransportMiddelGårChecked,
    dagensTransportMiddelKollektivChecked, settDagensTransportMiddelKollektivChecked,
    settDagensTransportmiddelValidert,
    settMånedligeUtgifterState,
    settAntallKilometerState,
  } = useAppStore();

  const skrivEndringTilGlobalState = (nyValgt: string) => {
    if (nyValgt === transportalternativerVerdier.EGEN_BIL) {
      settDagensTransportMiddelEgenBilChecked(!dagensTransportMiddelEgenBilChecked);
      settAntallKilometerState('');
    } else if (nyValgt === transportalternativerVerdier.SYKLER) {
      settDagensTransportMiddelSyklerChecked(!dagensTransportMiddelSyklerChecked);
    } else if (nyValgt === transportalternativerVerdier.GÅR) {
      settDagensTransportMiddelGårChecked(!dagensTransportMiddelGårChecked);
    } else if (nyValgt === transportalternativerVerdier.KOLLEKTIVTRANSPORT) {
      settDagensTransportMiddelKollektivChecked(!dagensTransportMiddelKollektivChecked);
      settMånedligeUtgifterState('');
    }
  };

  const erChecked = (alternativ: string) => {
    if (alternativ === transportalternativerVerdier.EGEN_BIL) {
      return dagensTransportMiddelEgenBilChecked;
    }
    if (alternativ === transportalternativerVerdier.SYKLER) {
      return dagensTransportMiddelSyklerChecked;
    }
    if (alternativ === transportalternativerVerdier.GÅR) {
      return dagensTransportMiddelGårChecked;
    }
    if (alternativ === transportalternativerVerdier.KOLLEKTIVTRANSPORT) {
      return dagensTransportMiddelKollektivChecked;
    }
    return false;
  };

  const checkboxesProps = svaralternativer.map(
    (alternativ) => ({ ...alternativ, ...{ checked: erChecked(alternativ.value) } }),
  );

  return (
    <div id={id}>
      <CheckboksPanelGruppe
        legend={tittel}
        checkboxes={
          checkboxesProps
        }
        onChange={(_, nyVerdi) => {
          skrivEndringTilGlobalState(nyVerdi);
          settDagensTransportmiddelValidert(undefined);
        }}
      />
    </div>
  );
};

export default DagensTransportmiddelCheckbox;
