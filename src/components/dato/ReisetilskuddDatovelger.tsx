import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { Norwegian } from 'flatpickr/dist/l10n/no';
import './flatpickr.less';

const ReisetilskuddDatovelger: React.FC = () => {
  const [dato, setDato] = useState(new Date());

  const validerDato = (d : Date[]) => {
    setDato(d[0]);
  };

  return (
    <Flatpickr
      id="datoTest"
      name="datoTest"
      className="skjemaelement__input input--m"
      value={dato}
      placeholder="dd.mm.åååå"
      options={{
        mode: 'single',
        enableTime: false,
        dateFormat: 'Y-m-d',
        altInput: true,
        altFormat: 'd.m.Y',
        locale: Norwegian,
        allowInput: true,
        disableMobile: true,
      }}
      onChange={(date) => validerDato(date)}
    />
  );
};

export default ReisetilskuddDatovelger;
