import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Fareknapp } from 'nav-frontend-knapper';
import { SlettIkon } from '../../assets/ikoner';
import vedlegg from '../../assets/vedlegg.svg';
import formaterFilstørrelse from './utils';
import { IVedlegg } from '../../models/vedlegg';
import { formatertDato, DatoFormat } from '../../utils/dato';

interface Props {
  fil: IVedlegg;
  slettVedlegg?: (vedlegg: IVedlegg) => void;
}

const FilMedInfo: React.FC<Props> = ({ fil, slettVedlegg }) => (
  <div className="kvittering-info">
    <div className="kvittering">
      <img
        src={vedlegg}
        alt="Vedleggsikon"
      />
      <Normaltekst className="filnavn">{fil.navn}</Normaltekst>
      <Normaltekst className="filstorrelse">
        (
        {formaterFilstørrelse(fil.størrelse)}
        )
      </Normaltekst>
    </div>
    <Normaltekst className="belop">{fil.beløp}</Normaltekst>
    <Normaltekst className="dato">{fil.dato ? formatertDato(fil.dato, DatoFormat.NATURLIG_LANG) : ''}</Normaltekst>
    {slettVedlegg
      ? (
        <Fareknapp className="slett-knapp" mini onClick={() => { slettVedlegg(fil); }}>
          <SlettIkon />
          <span>SLETT</span>
        </Fareknapp>
      )
      : <></>}
  </div>
);

export default FilMedInfo;
