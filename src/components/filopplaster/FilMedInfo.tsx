import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Fareknapp } from 'nav-frontend-knapper';
import { SlettIkon } from '../../assets/ikoner';
import vedlegg from '../../assets/vedlegg.svg';
import formaterFilstørrelse from './utils';
import { IVedlegg } from '../../models/vedlegg';

interface Props {
  fil: IVedlegg;
  slettVedlegg?: (vedlegg: IVedlegg) => void;
}

const FilMedInfo: React.FC<Props> = ({ fil, slettVedlegg }) => (
  <div className="fil">
    <div className="kvittering">
      <img
        className="vedleggsikon"
        src={vedlegg}
        alt="Vedleggsikon"
      />
      <Normaltekst className="filnavn">{fil.navn}</Normaltekst>
      <Normaltekst className="filstørrelse">
        (
        {formaterFilstørrelse(fil.størrelse)}
        )
      </Normaltekst>
      </div>
        <Normaltekst className="beløp">{fil.beløp}</Normaltekst>
        <Normaltekst className="dato">{fil.dato?.toDateString()}</Normaltekst>
    {slettVedlegg
      ? (
        <Fareknapp mini onClick={() => { slettVedlegg(fil); }}>
          <SlettIkon />
          <span>SLETT</span>
        </Fareknapp>
      )
      : <></>}
  </div>
);

export default FilMedInfo;
