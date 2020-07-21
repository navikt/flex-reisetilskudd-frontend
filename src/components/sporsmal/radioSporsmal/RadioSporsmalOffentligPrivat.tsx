import React, { ReactElement } from 'react';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import { RadioSpørsmålProps } from '../../../types/types';
import './RadioSpørsmål.less';
import { useAppStore } from '../../../data/stores/app-store';
import { endreOffentligPrivatRadioVerdi } from '../sporsmalsUtils';

const RadioSporsmalOffentligPrivat = ({
  tittel, name, spørsmålstekst, svaralternativer,
}: RadioSpørsmålProps): ReactElement => {
  const {
    dagensTransportmiddelState,
    settDagensTransportmiddelState,
  } = useAppStore();

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
        checked={dagensTransportmiddelState.offentligPrivatSpørsmål}
        onChange={(_, nyVerdi) => {
          endreOffentligPrivatRadioVerdi(
            nyVerdi,
            dagensTransportmiddelState,
            settDagensTransportmiddelState,
          );
        }}
      />
    </div>
  );
};

export default RadioSporsmalOffentligPrivat;
