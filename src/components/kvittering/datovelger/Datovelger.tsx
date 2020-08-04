import React, { ReactNode } from 'react';
import Flatpickr from 'react-flatpickr';
import { Norwegian } from 'flatpickr/dist/l10n/no';
import './flatpickr.less';
import './Datovelger.less';
import { Element } from 'nav-frontend-typografi';
import { SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import Vis from '../../Vis';

interface Props {
  label?: ReactNode;
  className?: string;
  onChange?: (d: Date[]) => void;
  mode?: 'single' | 'multiple' | 'range' | 'time';
  id?: string;
  feil?: string;
  maksDato?: string;
}

const Datovelger: React.FC<Props> = ({
  label = '', className = '', onChange = () => { }, mode = 'single', id = '', feil = undefined,
  maksDato = undefined,
}) => {
  const validerDato = (d: Date[]) => {
    onChange(d);
  };

  return (
    <div className={`datovelger-wrapper ${className} ${feil ? 'datovelger-med-feil' : ''}`}>
      <Element className="label">{label}</Element>
      <Flatpickr
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
          maxDate: maksDato,
        }}
        onChange={(date) => validerDato(date)}
        id={id}
      />
      <Vis hvis={feil !== undefined}>
        <SkjemaelementFeilmelding>
          {feil}
        </SkjemaelementFeilmelding>
      </Vis>
    </div>
  );
};

export default Datovelger;
