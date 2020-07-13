import React from 'react';
import { CheckboksPanelGruppe } from 'nav-frontend-skjema';
import { CheckboxProps } from '../../../types/types';
import 'nav-frontend-skjema-style';

const checkboxSpørsmål = ({ tittel, svaralternativer }: CheckboxProps) => (
  <CheckboksPanelGruppe
    legend={tittel}
    checkboxes={
        svaralternativer
    }
    onChange={() => {}}
  />
);

export default checkboxSpørsmål;
