import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Fareknapp } from 'nav-frontend-knapper';
import { SlettIkon } from '../../assets/ikoner';
import vedlegg from '../../assets/vedlegg.svg';
import formaterFilstørrelse from './utils';
import { IVedlegg } from '../../models/vedlegg';

interface Props {
  filliste: IVedlegg[];
  slettVedlegg?: (vedlegg: IVedlegg) => void;
  className?: string;
}

const OpplastedeFiler: React.FC<Props> = ({ filliste, slettVedlegg, className }) => (
  <div className={className}>
    {filliste.map((fil: IVedlegg, index: number) => (
      <div key={fil.navn}>
        <div className="fil">
          <div>
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
          {slettVedlegg
            ? (
              <Fareknapp mini onClick={() => { slettVedlegg(fil); }}>
                <SlettIkon />
                <span>slett</span>
              </Fareknapp>
            )
            : <></>}
        </div>
        {index === filliste.length - 1 ? '' : <hr />}
      </div>
    ))}
  </div>
);

export default OpplastedeFiler;
