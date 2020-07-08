import 'nav-frontend-skjema-style';
import React, { useState, ReactElement } from 'react';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import './sporsmal.less';
import { Undertittel } from 'nav-frontend-typografi';

function RadioPG(): ReactElement {
  const [active, setActive] = useState();

  return (
    <div>
      <Undertittel>
        Utbetaling
      </Undertittel>
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
    </div>
  );
}

export default RadioPG;
