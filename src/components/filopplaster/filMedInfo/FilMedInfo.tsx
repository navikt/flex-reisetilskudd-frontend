import React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import vedlegg from '../../../assets/vedlegg.svg';
import formaterFilstørrelse from '../utils';
import { KvitteringInterface } from '../../../models/kvittering';
import { formatertDato, DatoFormat } from '../../../utils/dato';
import { useAppStore } from '../../../data/stores/app-store';
import './filMedInfo.less';
import Vis from '../../Vis';

interface Props {
  fil: KvitteringInterface;
  fjernKnapp?: boolean;
}

const SlettFilIkon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M11 1H1V21H10.5V22H0.5C0.224 22 0 21.776 0 21.5V0.5C0 0.224 0.224 0 0.5 0H11.5C11.567 0 11.632 0.014 11.692 0.04C11.753 0.065 11.808 0.102 11.854 0.148L16.847 5.142C16.896 5.19 16.936 5.247 16.962 5.311C16.9647 5.3176 16.9657 5.32479 16.9666 5.3321C16.9674 5.33809 16.9682 5.34414 16.97 5.35L16.97 5.35001C16.985 5.39801 17 5.44601 17 5.5V5.501V5.502V9.5H16V6H11.5C11.224 6 11 5.776 11 5.5V1ZM15.292 5L12 1.707V5H15.292ZM11 17.5C11 13.916 13.916 11 17.5 11C21.084 11 24 13.916 24 17.5C24 21.084 21.084 24 17.5 24C13.916 24 11 21.084 11 17.5ZM12 17.5C12 20.532 14.467 23 17.5 23C20.533 23 23 20.532 23 17.5C23 14.468 20.533 12 17.5 12C14.467 12 12 14.468 12 17.5ZM19.846 14.447C20.041 14.252 20.358 14.252 20.553 14.447C20.748 14.643 20.748 14.959 20.553 15.154L18.207 17.5L20.555 19.846C20.75 20.041 20.75 20.358 20.555 20.553C20.457 20.65 20.329 20.699 20.201 20.699C20.073 20.699 19.945 20.651 19.847 20.553L17.5 18.207L15.154 20.553C15.056 20.65 14.928 20.699 14.8 20.699C14.672 20.699 14.544 20.651 14.446 20.553C14.251 20.358 14.251 20.041 14.446 19.846L16.792 17.5L14.446 15.154C14.251 14.959 14.251 14.642 14.446 14.447C14.641 14.252 14.958 14.252 15.153 14.447L17.499 16.793L19.846 14.447Z" fill="#3E3832" />
  </svg>
);

const FilMedInfo: React.FC<Props> = ({ fil, fjernKnapp }) => {
  const { kvitteringer, settKvitteringer } = useAppStore();

  const slettKvittering = (kvitteringSomSkalSlettes: KvitteringInterface) => {
    settKvitteringer(kvitteringer.filter(
      (kvittering) => kvittering.kvitteringId !== kvitteringSomSkalSlettes.kvitteringId,
    ));
  };

  const håndterKlikk = () => {
    if (slettKvittering) {
      slettKvittering(fil);
    }
  };

  function truncate(fullString: string, stringLen: number, separator: string) {
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
    <div className={` ${fjernKnapp ? 'fil-med-info' : 'fil-med-info-uten-slettknapp'}`}>
      <div className="kvittering">
        <img
          className="vedleggsikon"
          src={vedlegg}
          alt="Vedleggsikon"
        />
        <Lenke href="#" className="filnavn">{truncate(fil.navn, 15, '...')}</Lenke>
      </div>
      <Normaltekst className="filstorrelse">
        (
        {formaterFilstørrelse(fil.storrelse)}
        )
      </Normaltekst>
      <Normaltekst className="belop">
        {fil.belop}
        {' '}
        kr
      </Normaltekst>
      <Normaltekst className="dato">
        {fil.fom
          ? formatertDato(fil.fom, DatoFormat.NATURLIG_LANG)
          : ''}
      </Normaltekst>
      <Vis hvis={fjernKnapp}>
        <Knapp className="slett-knapp" onClick={håndterKlikk}>
          <SlettFilIkon />
          <span>Fjern</span>
        </Knapp>
      </Vis>
      <Element className="mobil-belop">Beløp:</Element>
      <Element className="mobil-dato">Dato:</Element>
    </div>
  );
};

export default FilMedInfo;
