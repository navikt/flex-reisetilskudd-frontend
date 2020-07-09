import 'nav-frontend-skjema-style';
import React, { useState, ReactElement } from 'react';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import './sporsmal.less';
import { Undertittel } from 'nav-frontend-typografi';

interface Svaralternativ {
  label: string,
  value: string,
  id: string,
}

interface RadioPGProps {
  tittel: string,
  name: string,
  spørsmålstekst: string,
  svaralternativer: Svaralternativ[],
}

function RadioPG({
  tittel, name, spørsmålstekst, svaralternativer,
}: RadioPGProps): ReactElement {
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

export default RadioPG;
