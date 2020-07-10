import 'nav-frontend-skjema-style';
import React, { useState, ReactElement } from 'react';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import './RadioSpørsmål.less';
import { Undertittel } from 'nav-frontend-typografi';
import { RadioSpørsmålProps } from '../../../types/types';

function RadioSpørsmål({
  tittel, name, spørsmålstekst, svaralternativer,
}: RadioSpørsmålProps): ReactElement {
  const [active, setActive] = useState();

  return (
    <div>
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
        onChange={(_, e) => setActive(e)}
      />
    </div>
  );
}

export default RadioSpørsmål;
