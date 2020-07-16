import React from 'react';
import FilMedInfo from './FilMedInfo'
import { IVedlegg } from '../../models/vedlegg';

interface Props {
  filliste: IVedlegg[];
  slettVedlegg?: (vedlegg: IVedlegg) => void;
  className?: string;
}

const OpplastedeFiler: React.FC<Props> = ({ filliste, slettVedlegg, className }) => (
  <div className={className}>
    {filliste.map((fil: IVedlegg, index: number) => (
      <div key={fil.navn}>
        <FilMedInfo fil={fil} slettVedlegg={slettVedlegg} />
        {index === filliste.length - 1 ? '' : <hr />}
      </div>
    ))}
  </div>
);

export default OpplastedeFiler;
