import React, { ReactElement } from 'react';
import { CheckboksPanelGruppe } from 'nav-frontend-skjema';
import { CheckboxProps } from '../../../types/types';
import 'nav-frontend-skjema-style';
import { useAppStore } from '../../../data/stores/app-store';
import { transportalternativerPrivatVerdier } from '../spørsmålTekster';

const CheckboxSpørsmål = ({ tittel, svaralternativer }: CheckboxProps) : ReactElement => {
  const {
    dagensTransportmiddelState, settDagensTransportmiddelState,
  } = useAppStore();

  enum DagensTransportmiddelCheckboxEnum {
    egenBilChecked = 'egenBilChecked',
    syklerChecked = 'syklerChecked',
    gårChecked = 'gårChecked',
  }

  const fåKopiState = () => ({ ...dagensTransportmiddelState });

  const oppdaterVerdi = (checkBoxVerdi : DagensTransportmiddelCheckboxEnum) => {
    const nyState = fåKopiState();
    // eslint-disable-next-line max-len
    nyState.transportalternativerPrivat[checkBoxVerdi] = !dagensTransportmiddelState.transportalternativerPrivat[checkBoxVerdi];
    settDagensTransportmiddelState(nyState);
  };

  const skrivEndringTilGlobalState = (nyValgt: string) => {
    if (nyValgt === transportalternativerPrivatVerdier.EGEN_BIL) {
      oppdaterVerdi(DagensTransportmiddelCheckboxEnum.egenBilChecked);
    } else if (nyValgt === transportalternativerPrivatVerdier.SYKLER) {
      oppdaterVerdi(DagensTransportmiddelCheckboxEnum.syklerChecked);
    } else if (nyValgt === transportalternativerPrivatVerdier.GÅR) {
      oppdaterVerdi(DagensTransportmiddelCheckboxEnum.gårChecked);
    }
  };

  const erChecked = (alternativ : string) => {
    if (alternativ === transportalternativerPrivatVerdier.EGEN_BIL) {
      // return egenBilChecked;
      return dagensTransportmiddelState.transportalternativerPrivat.egenBilChecked;
    }
    if (alternativ === transportalternativerPrivatVerdier.SYKLER) {
      // return syklerChecked;
      return dagensTransportmiddelState.transportalternativerPrivat.syklerChecked;
    }
    if (alternativ === transportalternativerPrivatVerdier.GÅR) {
      // return gårChecked;
      return dagensTransportmiddelState.transportalternativerPrivat.gårChecked;
    }
    return false;
  };

  const endraAlternativer = svaralternativer.map(
    (alternativ) => ({ ...alternativ, ...{ checked: erChecked(alternativ.value) } }),
  );

  return (
    <CheckboksPanelGruppe
      legend={tittel}
      checkboxes={
        endraAlternativer
    }
      onChange={(_, nyVerdi) => {
        skrivEndringTilGlobalState(nyVerdi);
      }}
    />
  );
};

export default CheckboxSpørsmål;
