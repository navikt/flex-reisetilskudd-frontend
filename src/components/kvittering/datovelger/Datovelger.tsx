import React, { ReactNode } from 'react';
import Flatpickr from 'react-flatpickr';
import { Norwegian } from 'flatpickr/dist/l10n/no';
import './flatpickr.less';
import './Datovelger.less';
import { Undertittel } from 'nav-frontend-typografi';

interface Props {
  label?: ReactNode;
  className?: string;
  onChange?: (d: Date[]) => void;
  mode?: 'single' | 'multiple' | 'range' | 'time';
  id?: string;
}

const Datovelger: React.FC<Props> = ({
  label = '',
  className = '',
  onChange = () => { },
  mode = 'single',
  id = '',
}) => {
  const validerDato = (d: Date[]) => {
    onChange(d);
  };

  return (
    <div className={`datovelger-wrapper ${className}`}>
      <Undertittel className="label">{label}</Undertittel>
      <Flatpickr
        name="datoTest"
        className="skjemaelement__input input--m"
        placeholder={(mode === 'range') ? 'dd.mm.åååå til dd.mm.åååå' : 'dd.mm.åååå'}
        options={{
          mode,
          enableTime: false,
          dateFormat: 'Y-m-d',
          altInput: true,
          altFormat: 'd.m.Y',
          locale: Norwegian,
          allowInput: true,
          disableMobile: true,
        }}
        onChange={(date) => validerDato(date)}
        id={id}
      />
    </div>
  );
};

export default Datovelger;
