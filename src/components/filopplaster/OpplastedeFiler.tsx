import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import FilMedInfo from './FilMedInfo';
import { Vedlegg } from '../../models/vedlegg';
import Vis from '../Vis';

interface Props {
  filliste: Vedlegg[];
  slettVedlegg?: (vedlegg: Vedlegg) => void;
  className?: string;
}

const OpplastedeFiler: React.FC<Props> = ({ filliste, slettVedlegg, className }) => (
  <div className={className}>
    <div className="kvitterings-tittler">
      <Vis hvis={filliste.length > 0}>
        <Undertittel className="kvittering-tittel">Kvittering</Undertittel>
        <Undertittel className="belop-tittel">Beløp</Undertittel>
        <Undertittel className="dato-tittel">Dato</Undertittel>
      </Vis>
    </div>

    {filliste.map((fil: Vedlegg, index: number) => (
      <div key={fil.navn}>
        <FilMedInfo fil={fil} slettVedlegg={slettVedlegg} />
        {index === filliste.length - 1 ? '' : <hr />}
      </div>
    ))}
  </div>
);

export default OpplastedeFiler;
