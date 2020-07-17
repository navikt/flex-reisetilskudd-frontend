import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import { DatoFormat, formatertDato } from '../../../utils/dato';

interface Props {
  fraDato?: Date,
  tilDato?: Date,
  index?: number,
}

const PeriodeTittel: React.FC<Props> = ({ fraDato, tilDato, index }) => (
  (
    <div>
      <Undertittel>{`Periode ${(index !== undefined ? index + 1 : '')}`}</Undertittel>
      {(fraDato && tilDato)
        ? (
          <Normaltekst>
            {formatertDato(fraDato, DatoFormat.NATURLIG_LANG)}
            {' '}
            -
            {' '}
            {formatertDato(tilDato, DatoFormat.NATURLIG_LANG)}
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
