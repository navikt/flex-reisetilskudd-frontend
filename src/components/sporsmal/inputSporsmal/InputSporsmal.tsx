import React, { ReactElement } from 'react';
import { Input } from 'nav-frontend-skjema';
import { InputProps } from '../../../types/types';

const InputSporsmal = ({
  tittel, inputMode, bredde, value, onChange,
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
  />
);

export default InputSporsmal;
