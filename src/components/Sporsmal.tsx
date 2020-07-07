import 'nav-frontend-skjema-style';
import React, { ReactElement, useState } from 'react';
import { RadioPanelGruppe } from 'nav-frontend-skjema';

const RadioPG= () => {
  const [active, setActive] = useState('juice1id')

  return(
  <RadioPanelGruppe
    name="samplename"
    legend="Hvilken drikke er best?"
    radios={[
        { label: 'Eplejuice', value: 'juice1', id: 'juice1id' },
        { label: 'Appelsinjuice', value: 'juice2', id: 'juice2id' },
        { label: 'Melk', value: 'melk', id: 'melkid' },
        { label: 'Ananasjuice', value: 'juice3', id: 'juice4id' }
    ]}
    checked={'juice2id'}
    onChange= {() => setActive('juice2id')}
/>)

}



/*function RadioPG() : ReactElement {
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
}*/

export default RadioPG;
