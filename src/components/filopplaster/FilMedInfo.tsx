import React, { useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Fareknapp } from 'nav-frontend-knapper';
import { SlettIkon } from '../../assets/ikoner';
import vedlegg from '../../assets/vedlegg.svg';
import formaterFilstørrelse from './utils';
import { VedleggInterface } from '../../models/vedlegg';
import { formatertDato, DatoFormat } from '../../utils/dato';

interface Props {
  fil: VedleggInterface;
  slettVedlegg?: (vedlegg: VedleggInterface) => void;
}

const FilMedInfo: React.FC<Props> = ({ fil, slettVedlegg }) => {
  const [spinnerAktiv, settSpinnerAktiv] = useState<boolean>(false);

  const håndterKlikk = () => {
    settSpinnerAktiv(true);
    if (slettVedlegg) {
      slettVedlegg(fil);
    }
  };

  return (
    <div className="fil-med-info">
      <div className="kvittering">
        <img
          className="vedleggsikon"
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
      <Normaltekst className="belop">
        {fil.beløp}
        {' '}
        kr
      </Normaltekst>
      <Normaltekst className="dato">{fil.dato ? formatertDato(fil.dato, DatoFormat.NATURLIG_LANG) : ''}</Normaltekst>
      {slettVedlegg
        ? (
          <Fareknapp className="slett-knapp" mini onClick={håndterKlikk} spinner={spinnerAktiv}>
            <SlettIkon />
            <span>SLETT</span>
          </Fareknapp>
        )
        : <></>}
    </div>
  );
};

export default FilMedInfo;
