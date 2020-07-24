import React, { ReactElement } from 'react';
import { formatertDato, DatoFormat } from '../../utils/dato';
import Vis from '../Vis';
import CheckedMedTekst from '../common/checkedMedTekst/CheckedMedTekst';

interface PeriodeTekstProps {
  fraDato: string,
  tilDato: string,
}

const PeriodeTekst = ({ fraDato, tilDato } : PeriodeTekstProps) : ReactElement => (
  <span className="sykmelding-periode-tekst">
    <Vis hvis={fraDato !== '' && tilDato !== ''}>
      <CheckedMedTekst
        tekst={`${formatertDato(new Date(fraDato), DatoFormat.NATURLIG_LANG)} til ${formatertDato(new Date(tilDato), DatoFormat.NATURLIG_LANG)}`}
      />
    </Vis>

    <Vis hvis={fraDato !== '' && tilDato === ''}>
      {formatertDato(new Date(fraDato), DatoFormat.NATURLIG_LANG)}
    </Vis>
    <Vis hvis={fraDato === '' && tilDato === ''}>
      Kunne dessverre ikke finne perioden
    </Vis>
  </span>
);

export default PeriodeTekst;
