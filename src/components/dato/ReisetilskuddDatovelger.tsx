import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { Norwegian } from 'flatpickr/dist/l10n/no';
import './flatpickr.less';
import './ReisetilskuddDatovelger.less';
import { Element } from 'nav-frontend-typografi';

export interface IDatovelgerProps {
  label?: string;
  className?: string;
}

const ReisetilskuddDatovelger: React.FC<IDatovelgerProps> = ({
  label = '',
  className = '',
}) => {
  const [dato, setDato] = useState(new Date());

  const validerDato = (d : Date[]) => {
    setDato(d[0]);
  };

  return (
    <div className={`datovelger-wrapper ${className}`}>
      <Element className="label">
        {label}
      </Element>
      <Flatpickr
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
    </div>
  );
};

export default ReisetilskuddDatovelger;
