import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import FilMedInfo from './FilMedInfo';
import { VedleggInterface } from '../../models/vedlegg';
import Vis from '../Vis';

interface Props {
  filliste: VedleggInterface[];
  slettVedlegg?: (vedlegg: VedleggInterface) => void;
  className?: string;
}

const OpplastedeFiler: React.FC<Props> = ({ filliste, slettVedlegg, className }) => (
  <div className={className}>
    <Vis hvis={filliste.length > 0}>
      <div className="kvitteringsinfo-tittel">
        <Undertittel className="kvittering-tittel">Kvittering</Undertittel>
        <Undertittel className="belop-tittel">Beløp</Undertittel>
        <Undertittel className="dato-tittel">Dato</Undertittel>
      </div>
    </Vis>

    {filliste.map((fil: VedleggInterface, index: number) => (
      <div key={fil.navn}>
        <FilMedInfo fil={fil} slettVedlegg={slettVedlegg} />
        {index === filliste.length - 1 ? '' : <hr />}
      </div>
    ))}
  </div>
);

export default OpplastedeFiler;
