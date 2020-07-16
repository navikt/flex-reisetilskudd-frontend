import React, { ReactNode } from 'react';
import Flatpickr from 'react-flatpickr';
import { Norwegian } from 'flatpickr/dist/l10n/no';
import './flatpickr.less';
import './ReisetilskuddDatovelger.less';
import { Undertittel } from 'nav-frontend-typografi';

interface Props {
  label?: ReactNode;
  className?: string;
  onChange?: (d : Date) => void
}

const ReisetilskuddDatovelger: React.FC<Props> = ({
  label = '',
  className = '',
  onChange = () => {},
}) => {
  const validerDato = (d : Date[]) => {
    onChange(d[0]);
  };

  return (
    <div className={`datovelger-wrapper ${className}`}>
      <Undertittel className="label">{label}</Undertittel>
      <Flatpickr
        name="datoTest"
        className="skjemaelement__input input--m"
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
