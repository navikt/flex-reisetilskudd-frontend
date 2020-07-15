import React, { ReactElement } from 'react';
import { CheckboksPanelGruppe } from 'nav-frontend-skjema';
import { CheckboxProps } from '../../../types/types';
import 'nav-frontend-skjema-style';
import { useAppStore } from '../../../data/stores/app-store';
import { transportalternativerPrivatVerdier } from '../spørsmålTekster';

const CheckboxSpørsmål = ({ tittel, svaralternativer }: CheckboxProps) : ReactElement => {
  const {
    egenBilChecked, setEgenBilChecked, syklerChecked, setSyklerChecked, gårChecked, setGårChecked,
  } = useAppStore();
  const skrivEndringTilGlobalState = (nyValgt: string) => {
    if (nyValgt === transportalternativerPrivatVerdier.EGEN_BIL) {
      setEgenBilChecked(!egenBilChecked);
    } else if (nyValgt === transportalternativerPrivatVerdier.SYKLER) {
      setSyklerChecked(!syklerChecked);
    } else if (nyValgt === transportalternativerPrivatVerdier.GÅR) {
      setGårChecked(!gårChecked);
    }
  };
  return (
    <CheckboksPanelGruppe
      legend={tittel}
      checkboxes={
        svaralternativer
    }
      onChange={(_, nyVerdi) => {
        skrivEndringTilGlobalState(nyVerdi);
      }}
    />
  );
};

export default CheckboxSpørsmål;
