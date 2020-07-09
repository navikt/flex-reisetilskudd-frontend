import React from 'react';
import { Datovelger as NavDatovelger, ISODateString } from 'nav-datovelger';
// import 'nav-datovelger/lib/styles/datovelger';

export interface IDatovelgerProps {
  disabled?: boolean;
  id: string;
  onChange: (dato?: ISODateString) => void;
  placeholder?: string;
  valgtDato?: string;
  className?: string;
}

export const ReisetilskuddDatovelger: React.FC<IDatovelgerProps> = ({
  disabled,
  id,
  onChange,
  placeholder,
  valgtDato,
  className = '',
}) => (
  <div id={id} className={className}>
    <NavDatovelger
      disabled={disabled}
      id={id}
      visÅrVelger
      input={{ name: id, id: `input_${id}`, placeholder }}
      locale="nb"
      valgtDato={valgtDato}
      onChange={onChange}
    />
  </div>
);
