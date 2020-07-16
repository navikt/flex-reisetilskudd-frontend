import React from 'react';
import FilMedInfo from './FilMedInfo';
import { IVedlegg } from '../../models/vedlegg';
import { Undertittel } from 'nav-frontend-typografi';
import Vis from '../../components/Vis';
import './Filopplaster'

interface Props {
  filliste: IVedlegg[];
  slettVedlegg?: (vedlegg: IVedlegg) => void;
  className?: string;
}

const OpplastedeFiler: React.FC<Props> = ({ filliste, slettVedlegg, className }) => (
  <div className={className}>
    <Vis hvis={filliste.length > 0}>
      <div className="kvitteringsinfo-tittel">
        <Undertittel>Kvittering</Undertittel>
        <Undertittel>Beløp</Undertittel>
        <Undertittel>Dato</Undertittel>
      </div>
    </Vis>

    {filliste.map((fil: IVedlegg, index: number) => (
      <div key={fil.navn}>
        <FilMedInfo fil={fil} slettVedlegg={slettVedlegg} />
        {index === filliste.length - 1 ? '' : <hr />}
      </div>
    ))}
  </div>
);

export default OpplastedeFiler;
