import { Normaltekst } from 'nav-frontend-typografi';
import React, { ReactElement } from 'react';
import { PeriodeInterface } from '../../../models/periode';
import totaltBeløp from './totalBelop';

const TotalBelop = (periode: PeriodeInterface): ReactElement => (
  <Normaltekst>
    {`Totalt beløp: ${totaltBeløp(periode).toFixed(2)}`}
  </Normaltekst>
);

export default TotalBelop;
