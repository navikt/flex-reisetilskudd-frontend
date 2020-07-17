import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import vedlegg from '../../assets/vedlegg.svg';
import formaterFilstørrelse from './utils';

interface Props {
  fil: File | null;
  className?: string;
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
              <Normaltekst className="filnavn">{fil.name}</Normaltekst>
              <Normaltekst className="filstorrelse">
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
