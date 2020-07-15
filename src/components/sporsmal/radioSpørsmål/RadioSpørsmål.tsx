import React, { useState, ReactElement } from 'react';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import { RadioSpørsmålProps } from '../../../types/types';
import './RadioSpørsmål.less';
import { useAppStore } from '../../../data/stores/app-store';

const RadioSpørsmål = ({
  tittel, name, spørsmålstekst, svaralternativer,
}: RadioSpørsmålProps): ReactElement => {
  const [active, setActive] = useState();
  const {
    setActiveOffentligPrivat, setEgenBilChecked, setSyklerChecked, setGårChecked,
  } = useAppStore();

  const skrivEndringTilGlobalState = (nyValgt: string) => {
    if (name === 'Transportmiddel') {
      setActiveOffentligPrivat(nyValgt);
      if (nyValgt === 'OFFENTLIG') {
        setEgenBilChecked(false);
        setSyklerChecked(false);
        setGårChecked(false);
      }
    }
  };

  return (
    <div className="horisontal-radio">
      <Undertittel>
        {tittel}
      </Undertittel>
      <RadioPanelGruppe
        name={name}
        legend={spørsmålstekst}
        radios={
          svaralternativer
        }
        checked={active}
        onChange={(_, nyVerdi) => {
          setActive(nyVerdi);
          skrivEndringTilGlobalState(nyVerdi);
        }}
      />
    </div>
  );
};

export default RadioSpørsmål;
