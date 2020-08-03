import { Element } from 'nav-frontend-typografi';
import React, { ReactElement } from 'react';
import { useAppStore } from '../../../data/stores/app-store';

const TotalBelop = (): ReactElement => {
  const { kvitteringer } = useAppStore();

  const totaltBeløp = (): number => (kvitteringer
    ? (
      kvitteringer
        .filter((kvittering) => kvittering.belop)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .map((kvittering) => kvittering.belop!)
        .reduce((a, b) => a + b, 0.0)
    )
    : (0.0));

  return (
    <Element>
      {`Totalt beløp: ${totaltBeløp().toFixed(2)}`}
    </Element>
  );
};

export default TotalBelop;
