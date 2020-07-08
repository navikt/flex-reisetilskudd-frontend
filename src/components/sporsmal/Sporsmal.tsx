import 'nav-frontend-skjema-style';
import React, { useState, ReactElement } from 'react';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import './sporsmal.less';

function RadioPG(): ReactElement {
  const [active, setActive] = useState();

  return (
    <RadioPanelGruppe
      name="Radio-spørsmål"
      legend="Skal reisetilskuddet utbetales til arbeidsgiver?"
      radios={[
        { label: 'Ja', value: 'ja', id: 'jaId' },
        { label: 'Nei', value: 'nei', id: 'neiId' },
      ]}
      checked={active}
      onChange={(_, e) => setActive(e)}
    />
  );
}

export default RadioPG;
