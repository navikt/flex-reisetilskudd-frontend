import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import slett from '../../assets/slett.svg';
import vedlegg from '../../assets/vedlegg.svg';
import formaterFilstørrelse from './utils';
import { IVedlegg } from '../../models/vedlegg';

interface Props {
  filliste: IVedlegg[];
  slettVedlegg?: (vedlegg: IVedlegg) => void;
}

const OpplastedeFiler: React.FC<Props> = ({ filliste, slettVedlegg }) => (
  <>
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
              <button
                className="slett"
                onClick={() => {
                  slettVedlegg(fil);
                }}
                type="submit"
              >
                <Normaltekst>slett</Normaltekst>
                <img className="slettikon" src={slett} alt="Rødt kryss" />
              </button>
            )
            : <></>}
        </div>
        {index === filliste.length - 1 ? '' : <hr />}
      </div>
    ))}
  </>
);

export default OpplastedeFiler;
