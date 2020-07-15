import React, { ReactElement } from 'react';
import { CheckboksPanelGruppe } from 'nav-frontend-skjema';
import { CheckboxProps } from '../../../types/types';
import 'nav-frontend-skjema-style';
import { useAppStore } from '../../../data/stores/app-store';

const CheckboxSpørsmål = ({ tittel, svaralternativer }: CheckboxProps) : ReactElement => {
  const {
    egenBilChecked, setEgenBilChecked, syklerChecked, setSyklerChecked, gårChecked, setGårChecked,
  } = useAppStore();
  const skrivEndringTilGlobalState = (nyValgt: string) => {
    if (nyValgt === 'EGEN BIL') {
      setEgenBilChecked(!egenBilChecked);
    } else if (nyValgt === 'SYKLER') {
      setSyklerChecked(!syklerChecked);
    } else if (nyValgt === 'GÅR') {
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
