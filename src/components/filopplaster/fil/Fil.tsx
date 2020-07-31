import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import vedlegg from '../../../assets/vedlegg.svg';
import formaterFilstørrelse from '../utils';
import './fil.less';

interface Props {
  fil: File | null;
  href?: string;
  className?: string;
}

function customTruncet(fullString:string, trimsize:number) {
  const separator = '...';
  if (fullString.length <= trimsize) {
    return fullString;
  }
  return fullString.substr(0, trimsize) + separator + fullString.substr(-3);
}

const Fil: React.FC<Props> = ({ fil }) => (
  <div>
    {fil
      ? (
        <div key={fil.name}>
          <div className="modal-fil">
            <div>
              <img
                className="vedleggsikon"
                src={vedlegg}
                alt="Vedleggsikon"
              />
              <Lenke href="#" className="filnavn">{customTruncet(fil.name, 20)}</Lenke>
              <Normaltekst className="filstørrelse">
                (
                {formaterFilstørrelse(fil.size)}
                )
              </Normaltekst>
            </div>
          </div>
        </div>
      )
      : (
        <AlertStripeFeil key="" className="feilmelding-alert">
          Det skjedde noe feil ved opplastingen av filen din. Vennligst prøv å på nytt
        </AlertStripeFeil>
      )}
  </div>
);

export default Fil;
