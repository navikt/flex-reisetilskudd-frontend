import React from 'react';
import RadioSpørsmål from '../../components/sporsmal/radioSpørsmål/RadioSpørsmål';
import CheckboxSpørsmål from '../../components/sporsmal/checkboxSpørsmål/CheckboxSpørsmål';
import { offentligPrivatSpørsmål, transportAlternativerPrivat } from '../../components/sporsmal/spørsmålTekster';

const DagensTransportmiddel = () => (
  <>
    {RadioSpørsmål(offentligPrivatSpørsmål)}
    {CheckboxSpørsmål(transportAlternativerPrivat)}
  </>
);

export default DagensTransportmiddel;
