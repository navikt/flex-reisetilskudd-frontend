import 'nav-frontend-skjema-style';
import React, { useState } from 'react';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import './sporsmal.less';

const RadioPG = () => {
  const [active, setActive] = useState();

  return (
    <RadioPanelGruppe
      name="samplename"
      className="horisontal-radiogruppe"
      legend="Hvilken drikke er best?"
      radios={[
        { label: 'Ja', value: 'ja', id: 'jaId' },
        { label: 'Nei', value: 'nei', id: 'neiId' },
      ]}
      checked={active}
      onChange={(_, e) => setActive(e)}
    />
  );
};

/* function RadioPG() : ReactElement {
  return (
    <div className="radioContainer" key="melk">
      <input
        type="radio"
        id="melk"
        name="melk"
        value="melk"
        checked= {true}
        className="skjemaelement__label"
      />

      <label className= "skjemaelement__label" htmlFor= "Ja-svar">Ja</label>
    </div>
  );
} */

export default RadioPG;
