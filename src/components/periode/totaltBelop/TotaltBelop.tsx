import { Normaltekst } from 'nav-frontend-typografi';
import React, { ReactElement } from 'react';
import { useAppStore } from '../../../data/stores/app-store';

const TotalBelop = (): ReactElement => {
  const { kvitteringer } = useAppStore();

  const totaltBeløp = (): number => (kvitteringer
    ? (
      kvitteringer
        .filter((kvittering) => kvittering.beløp)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .map((kvittering) => kvittering.beløp!)
        .reduce((a, b) => a + b, 0.0)
    )
    : (0.0));

  return (
    <Normaltekst>
      {`Totalt beløp: ${totaltBeløp()}`}
    </Normaltekst>
  );
};

export default TotalBelop;
