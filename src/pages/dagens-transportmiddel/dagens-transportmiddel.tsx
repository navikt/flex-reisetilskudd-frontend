import React, { ReactElement } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import RadioSpørsmål from '../../components/sporsmal/radioSpørsmål/RadioSpørsmål';
import Veileder from '../../components/sporsmal/Veileder';
import CheckboxSpørsmål from '../../components/sporsmal/checkboxSpørsmål/CheckboxSpørsmål';
import InputSpørsmål from '../../components/sporsmal/inputSpørsmål/InputSpørsmål';
import {
  offentligPrivatSpørsmål, transportAlternativerPrivat,
  antallKilometerSpørsmål, månedligeUtgifterSpørsmål, transportVeileder,
} from '../../components/sporsmal/spørsmålTekster';

const DagensTransportmiddel = (): ReactElement => (
  <>
    {RadioSpørsmål(offentligPrivatSpørsmål)}
    <Normaltekst>
      {Veileder(transportVeileder)}
    </Normaltekst>
    {CheckboxSpørsmål(transportAlternativerPrivat)}
    {InputSpørsmål(månedligeUtgifterSpørsmål)}
    {InputSpørsmål(antallKilometerSpørsmål)}
  </>
);

export default DagensTransportmiddel;
