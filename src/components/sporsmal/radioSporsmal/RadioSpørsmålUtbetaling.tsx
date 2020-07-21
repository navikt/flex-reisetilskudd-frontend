import React, { ReactElement } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { utbetalingSpørsmålVerdier } from '../spørsmålTekster';
import { useAppStore } from '../../../data/stores/app-store';
import { RadioSpørsmålProps } from '../../../types/types';

const RadioSpørsmålUtbetaling = ({
  tittel, name, spørsmålstekst, svaralternativer,
}: RadioSpørsmålProps): ReactElement => {
  const {
    activeMegArbeidsgiver,
    setActiveMegArbeidsgiver,
  } = useAppStore();

  const skrivEndringTilGlobalState = (nyValgt: string) => {
    if (name === utbetalingSpørsmålVerdier.NAME) {
      setActiveMegArbeidsgiver(nyValgt);
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
        checked={activeMegArbeidsgiver}
        onChange={(_, nyVerdi) => {
          skrivEndringTilGlobalState(nyVerdi);
        }}
      />
    </div>
  );
};

export default RadioSpørsmålUtbetaling;
