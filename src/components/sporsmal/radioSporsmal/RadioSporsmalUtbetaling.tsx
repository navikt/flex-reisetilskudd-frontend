import React, { ReactElement } from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { utbetalingSpørsmålVerdier } from '../sporsmalTekster';
import { useAppStore } from '../../../data/stores/app-store';
import { RadioSpørsmålProps } from '../../../models/sporsmal';
import './radiosporsmal-utbetaling.less';

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
      <Systemtittel className="utbetaling-tittel">
        {tittel}
      </Systemtittel>
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
