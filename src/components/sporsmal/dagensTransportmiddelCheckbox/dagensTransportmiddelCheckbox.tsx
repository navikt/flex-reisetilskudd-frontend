import React, { ReactElement } from 'react';
import { CheckboksPanelGruppe } from 'nav-frontend-skjema';
import { CheckboxProps } from '../../../types/types';
import 'nav-frontend-skjema-style';
import { useAppStore } from '../../../data/stores/app-store';
import { transportalternativerPrivatVerdier } from '../spørsmålTekster';
import { DagensTransportmiddelCheckboxStateEnum } from '../../../models/dagenstransportmiddel';
import { endreCheckboxVerdi } from '../sporsmalsUtils';

const DagensTransportmiddelCheckbox = (
  { tittel, svaralternativer, id }: CheckboxProps,
) : ReactElement => {
  const {
    dagensTransportmiddelState, settDagensTransportmiddelState,
    settDagensTransportMiddelValidert,
  } = useAppStore();

  const flipStateVerdi = (hvilkenCheckbox : DagensTransportmiddelCheckboxStateEnum) => {
    endreCheckboxVerdi(
      hvilkenCheckbox,
      !dagensTransportmiddelState.transportalternativerPrivat[hvilkenCheckbox],
      dagensTransportmiddelState,
      settDagensTransportmiddelState,
    );
  };

  const skrivEndringTilGlobalState = (nyValgt: string) => {
    if (nyValgt === transportalternativerPrivatVerdier.EGEN_BIL) {
      flipStateVerdi(DagensTransportmiddelCheckboxStateEnum.egenBilChecked);
    } else if (nyValgt === transportalternativerPrivatVerdier.SYKLER) {
      flipStateVerdi(DagensTransportmiddelCheckboxStateEnum.syklerChecked);
    } else if (nyValgt === transportalternativerPrivatVerdier.GÅR) {
      flipStateVerdi(DagensTransportmiddelCheckboxStateEnum.gårChecked);
    }
  };

  const erChecked = (alternativ : string) => {
    if (alternativ === transportalternativerPrivatVerdier.EGEN_BIL) {
      return dagensTransportmiddelState.transportalternativerPrivat.egenBilChecked;
    }
    if (alternativ === transportalternativerPrivatVerdier.SYKLER) {
      return dagensTransportmiddelState.transportalternativerPrivat.syklerChecked;
    }
    if (alternativ === transportalternativerPrivatVerdier.GÅR) {
      return dagensTransportmiddelState.transportalternativerPrivat.gårChecked;
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
          settDagensTransportMiddelValidert(undefined);
        }}
      />
    </div>
  );
};

export default DagensTransportmiddelCheckbox;
