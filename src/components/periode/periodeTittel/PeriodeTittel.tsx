import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import { DatoFormat, formatertDato } from '../../../utils/dato';
import { IPeriode } from '../../../models/periode';

interface Props {
  periode: IPeriode,
  index?: number,
}

const PeriodeTittel: React.FC<Props> = ({ periode, index }) => (
  (
    <div>
      <Undertittel>{`Periode ${(index !== undefined ? index + 1 : '')}`}</Undertittel>
      {(periode.fraDato && periode.tilDato)
        ? (
          <Normaltekst>
            {formatertDato(periode.fraDato, DatoFormat.NATURLIG_LANG)}
            {' '}
            -
            {' '}
            {formatertDato(periode.tilDato, DatoFormat.NATURLIG_LANG)}
          </Normaltekst>
        )
        : (
          <Normaltekst>
            Lengden på perioden er ikke spesifisert
          </Normaltekst>
        )}
    </div>
  )
);

export default PeriodeTittel;
