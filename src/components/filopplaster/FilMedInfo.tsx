import React, { useState } from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
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

  function truncate(fullString:string, stringLen:number, separator:string) {
    if (fullString.length <= stringLen) {
      return fullString;
    }
    /* const sepLen = separator.length;
    const charsToShow:number = stringLen - sepLen;
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);
    return fullString.substr(0, frontChars)
    + separator
    + fullString.substr(fullString.length - backChars); */
    return fullString.substr(0, 2) + separator + fullString.substr(-3);
  }

  return (
    <div className="fil-med-info">
      <div className="kvittering">
        <img
          className="vedleggsikon"
          src={vedlegg}
          alt="Vedleggsikon"
        />
        <Normaltekst className="filnavn">{truncate(fil.navn, 15, '...')}</Normaltekst>
      </div>
      <Normaltekst className="filstorrelse">
        (
        {formaterFilstørrelse(fil.størrelse)}
        )
      </Normaltekst>
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
      <Element className="mobil-belop">Beløp</Element>
      <Element className="mobil-dato">Dato</Element>
    </div>
  );
};

export default FilMedInfo;
