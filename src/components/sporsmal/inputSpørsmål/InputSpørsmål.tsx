import React, { ReactElement } from 'react';
import { Input } from 'nav-frontend-skjema';
import { InputProps } from '../../../types/types';

const InputSpørsmål = ({ tittel, inputMode, bredde }: InputProps): ReactElement => (
  <Input
    label={tittel}
    inputMode={inputMode}
    pattern="[0-9]*"
    bredde={bredde}
  />
);

export default InputSpørsmål;
