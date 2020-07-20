import React, { ReactElement } from 'react';
import { Innholdstittel, Normaltekst, Element } from 'nav-frontend-typografi';
import { useAppStore } from '../../data/stores/app-store';
import PeriodeTittel from '../periode/periodeTittel/PeriodeTittel';
import './periode-oppsummering.less';
import OpplastedeFiler from '../filopplaster/OpplastedeFiler';

const PeriodeOppsummering = () : ReactElement => {
  const { perioder } = useAppStore();
  return (
    <div className="oppsummering-wrapper">
      <Innholdstittel className="oppsummering-overskrift">Oppsummering av søknaden</Innholdstittel>
      {perioder.map((periode, index) => (
        <div key={periode.id}>
          <div className="oppsummering-element">
            <PeriodeTittel fraDato={periode.fraDato} tilDato={periode.tilDato} index={index} />
          </div>
          <div className="oppsummering-element">
            <Element> Transportmiddel </Element>
            <Normaltekst>{periode.transportMiddel}</Normaltekst>
          </div>
          <div className="oppsummering-element">
            <OpplastedeFiler
              filliste={periode.vedlegg}
              className="opplastede-filer"
            />
          </div>
          {index === periode.vedlegg.length - 1 ? '' : <hr className="oppsummering-element-split" />}
        </div>
      ))}
    </div>
  );
};

export default PeriodeOppsummering;
