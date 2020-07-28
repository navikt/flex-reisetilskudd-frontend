import React, { useState } from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { Fareknapp } from 'nav-frontend-knapper';
import { SlettIkon } from '../../../assets/ikoner';
// import vedlegg from '../../assets/vedlegg.svg';
import helsecannabis from '../../../assets/helsecannabis.svg';
import formaterFilstørrelse from '../utils';
import { KvitteringInterface } from '../../../models/kvittering';
import { formatertDato, DatoFormat } from '../../../utils/dato';
import { useAppStore } from '../../../data/stores/app-store';
import './filMedInfo.less';

interface Props {
  fil: KvitteringInterface;
}

const FilMedInfo: React.FC<Props> = ({ fil }) => {
  const [spinnerAktiv, settSpinnerAktiv] = useState<boolean>(false);
  const { kvitteringer, settKvitteringer } = useAppStore();

  const slettKvittering = (kvitteringSomSkalSlettes: KvitteringInterface) => {
    settKvitteringer(kvitteringer.filter(
      (kvittering) => kvittering.id !== kvitteringSomSkalSlettes.id,
    ));
  };

  const håndterKlikk = () => {
    settSpinnerAktiv(true);
    if (slettKvittering) {
      slettKvittering(fil);
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
          src={helsecannabis}
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
      <Normaltekst className="dato">
        {fil.dato
          ? formatertDato(fil.dato, DatoFormat.NATURLIG_LANG)
          : ''}
      </Normaltekst>
      <Fareknapp className="slett-knapp" mini onClick={håndterKlikk} spinner={spinnerAktiv}>
        <SlettIkon />
        <span>SLETT</span>
      </Fareknapp>
      <Element className="mobil-belop">Beløp:</Element>
      <Element className="mobil-dato">Dato:</Element>
    </div>
  );
};

export default FilMedInfo;
