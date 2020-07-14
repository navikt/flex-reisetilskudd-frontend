import React, { ReactElement } from 'react';
import { CheckboksPanelGruppe } from 'nav-frontend-skjema';
import { CheckboxProps } from '../../../types/types';
import 'nav-frontend-skjema-style';

const checkboxSpørsmål = ({ tittel, svaralternativer }: CheckboxProps) : ReactElement => (
  <CheckboksPanelGruppe
    legend={tittel}
    checkboxes={
        svaralternativer
    }
    onChange={() => {}}
  />
);

export default checkboxSpørsmål;
