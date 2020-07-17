import { Normaltekst } from 'nav-frontend-typografi';
import React, { ReactElement } from 'react';
import { IPeriode } from '../../../models/periode';

const TotalBelop = (periode : IPeriode) : ReactElement => {
  const totaltBeløp = periode.vedlegg
    ? (
      periode.vedlegg
        .filter((vedlegg) => vedlegg.beløp)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .map((vedlegg) => vedlegg.beløp!)
        .reduce((a, b) => a + b, 0.0)
    )
    : (0.0);
  return (
    <Normaltekst>
      {`Totalt beløp: ${totaltBeløp}`}
    </Normaltekst>
  );
};

export default TotalBelop;
