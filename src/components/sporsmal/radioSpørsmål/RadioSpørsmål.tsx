import React, { useState } from 'react';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import { RadioSpørsmålProps } from '../../../types/types';
import './RadioSpørsmål.less';

const RadioSpørsmål = ({
  tittel, name, spørsmålstekst, svaralternativer,
}: RadioSpørsmålProps) => {
  const [active, setActive] = useState();

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
        onChange={(_, e) => setActive(e)}
      />
    </div>
  );
};

export default RadioSpørsmål;
