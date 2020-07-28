import React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import vedlegg from '../../../assets/vedlegg.svg';
import formaterFilstørrelse from '../utils';
import { KvitteringInterface } from '../../../models/kvittering';
import { formatertDato, DatoFormat } from '../../../utils/dato';
import { useAppStore } from '../../../data/stores/app-store';
import './filMedInfo.less';

interface Props {
  fil: KvitteringInterface;
}

const FilIkon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M11.3333 6.684V3.66667C11.3333 3.578 11.298 3.49333 11.236 3.43067L7.90267 0.0973333C7.84 0.0353333 7.75467 0 7.66667 0H0.333333C0.149333 0 0 0.149333 0 0.333333V14.3333C0 14.5173 0.149333 14.6667 0.333333 14.6667H7.676C7.04533 13.8293 6.66667 12.7927 6.66667 11.6667C6.66667 9.022 8.732 6.856 11.3333 6.684ZM7.66667 0.333333L11 3.66667H7.66667V0.333333ZM11.6667 7.33333C9.27733 7.33333 7.33333 9.27667 7.33333 11.6667C7.33333 14.056 9.27733 16 11.6667 16C14.056 16 16 14.056 16 11.6667C16 9.27667 14.056 7.33333 11.6667 7.33333ZM13.702 13.2307C13.832 13.36 13.832 13.572 13.702 13.702C13.6367 13.7673 13.5513 13.7993 13.466 13.7993C13.3813 13.7993 13.296 13.7667 13.2307 13.702L11.6667 12.1373L10.102 13.702C10.0367 13.7673 9.95133 13.7993 9.866 13.7993C9.78067 13.7993 9.69533 13.7667 9.63 13.702C9.5 13.572 9.5 13.36 9.63 13.2307L11.1947 11.6667L9.63 10.102C9.5 9.97133 9.5 9.76067 9.63 9.63067C9.76 9.50067 9.97133 9.50067 10.1013 9.63067L11.666 11.1953L13.2307 9.63067C13.3607 9.50067 13.5713 9.50067 13.702 9.63067C13.832 9.76067 13.832 9.97133 13.702 10.102L12.138 11.6667L13.702 13.2307Z" fill="#0067C5" />
  </svg>
);

const FilMedInfo: React.FC<Props> = ({ fil }) => {
  const { kvitteringer, settKvitteringer } = useAppStore();

  const slettKvittering = (kvitteringSomSkalSlettes: KvitteringInterface) => {
    settKvitteringer(kvitteringer.filter(
      (kvittering) => kvittering.id !== kvitteringSomSkalSlettes.id,
    ));
  };

  const håndterKlikk = () => {
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
      <Normaltekst className="dato">
        {fil.dato
          ? formatertDato(fil.dato, DatoFormat.NATURLIG_LANG)
          : ''}
      </Normaltekst>
      <Lenke className="slett-knapp" href="#" onClick={håndterKlikk}>
        <FilIkon />
        <span>Fjern</span>
      </Lenke>
      <Element className="mobil-belop">Beløp:</Element>
      <Element className="mobil-dato">Dato:</Element>
    </div>
  );
};

export default FilMedInfo;
