import React, { ReactElement } from 'react';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import { RadioSpørsmålProps } from '../../../types/types';
import './RadioSpørsmål.less';
import { useAppStore } from '../../../data/stores/app-store';
import { offentligPrivatVerdier } from '../spørsmålTekster';

const RadioSpørsmål = ({
  tittel, name, spørsmålstekst, svaralternativer,
}: RadioSpørsmålProps): ReactElement => {
  const {
    setActiveOffentligPrivat,
    activeOffentligPrivat,
    setEgenBilChecked,
    setSyklerChecked,
    setGårChecked,
  } = useAppStore();

  const skrivEndringTilGlobalState = (nyValgt: string) => {
    /* For endringer på spørsmålet "offentlig eller privat transportmiddel",
     som skal ha underspørsmål:  */
    if (name === offentligPrivatVerdier.NAME) {
      setActiveOffentligPrivat(nyValgt);
      if (nyValgt === offentligPrivatVerdier.OFFENTLIG) {
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
        description={spørsmålstekst}
        radios={
          svaralternativer
        }
        checked={activeOffentligPrivat}
        onChange={(_, nyVerdi) => {
          skrivEndringTilGlobalState(nyVerdi);
        }}
      />
    </div>
  );
};

export default RadioSpørsmål;
