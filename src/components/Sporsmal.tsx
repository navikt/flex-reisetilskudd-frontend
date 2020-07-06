import React, { ReactElement } from 'react';

function RadioPG() : ReactElement {
  return (
    <div className="radioContainer" key="melk">
      <input
        type="radio"
        id="melk"
        name="melk"
        value="melk"
        checked
        className="skjemaelement__input radioknapp"
      />
    </div>
  );
}

export default RadioPG;
