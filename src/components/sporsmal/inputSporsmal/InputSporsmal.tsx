import React, { ReactElement } from 'react';
import { Input } from 'nav-frontend-skjema';
import { InputProps } from '../../../types/types';

const InputSporsmal = ({
  tittel, inputMode, bredde, value, onChange, id, feil,
}: InputProps): ReactElement => (
  <Input
    label={tittel}
    inputMode={inputMode}
    pattern="[0-9]*"
    bredde={bredde}
    value={value}
    onChange={(e) => {
      if (onChange) {
        onChange(e.target.value);
      }
    }}
    id={id}
    feil={feil}
  />
);

export default InputSporsmal;
