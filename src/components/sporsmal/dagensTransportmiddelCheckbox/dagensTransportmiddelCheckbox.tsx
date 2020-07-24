import React, { ReactElement } from 'react';
import { CheckboksPanelGruppe } from 'nav-frontend-skjema';
import { CheckboxProps } from '../../../types/types';
import 'nav-frontend-skjema-style';
import { useAppStore } from '../../../data/stores/app-store';
import { transportalternativerVerdier } from '../spørsmålTekster';
import { DagensTransportmiddelCheckboxStateEnum } from '../../../models/dagenstransportmiddel';
import { endreCheckboxVerdi } from '../sporsmalsUtils';

const DagensTransportmiddelCheckbox = (
  { tittel, svaralternativer, id }: CheckboxProps,
): ReactElement => {
  const {
    dagensTransportmiddelState, settDagensTransportmiddelState,
    settDagensTransportmiddelValidert,
  } = useAppStore();

  const flipStateVerdi = (hvilkenCheckbox: DagensTransportmiddelCheckboxStateEnum) => {
    endreCheckboxVerdi(
      hvilkenCheckbox,
      !dagensTransportmiddelState.transportalternativer[hvilkenCheckbox],
      dagensTransportmiddelState,
      settDagensTransportmiddelState,
    );
  };

  const skrivEndringTilGlobalState = (nyValgt: string) => {
    if (nyValgt === transportalternativerVerdier.EGEN_BIL) {
      flipStateVerdi(DagensTransportmiddelCheckboxStateEnum.egenBilChecked);
    } else if (nyValgt === transportalternativerVerdier.SYKLER) {
      flipStateVerdi(DagensTransportmiddelCheckboxStateEnum.syklerChecked);
    } else if (nyValgt === transportalternativerVerdier.GÅR) {
      flipStateVerdi(DagensTransportmiddelCheckboxStateEnum.gårChecked);
    } else if (nyValgt === transportalternativerVerdier.KOLLEKTIVTRANSPORT) {
      flipStateVerdi(DagensTransportmiddelCheckboxStateEnum.kollektivtransportChecked);
    }
  };

  const erChecked = (alternativ: string) => {
    if (alternativ === transportalternativerVerdier.EGEN_BIL) {
      return dagensTransportmiddelState.transportalternativer.egenBilChecked;
    }
    if (alternativ === transportalternativerVerdier.SYKLER) {
      return dagensTransportmiddelState.transportalternativer.syklerChecked;
    }
    if (alternativ === transportalternativerVerdier.GÅR) {
      return dagensTransportmiddelState.transportalternativer.gårChecked;
    }
    if (alternativ === transportalternativerVerdier.KOLLEKTIVTRANSPORT) {
      return dagensTransportmiddelState.transportalternativer.kollektivtransportChecked;
    }
    return false;
  };

  const endraAlternativer = svaralternativer.map(
    (alternativ) => ({ ...alternativ, ...{ checked: erChecked(alternativ.value) } }),
  );

  return (
    <div id={id}>
      <CheckboksPanelGruppe
        legend={tittel}
        checkboxes={
          endraAlternativer
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
