import React, { ReactElement } from 'react';
import {
  Innholdstittel, Ingress,
} from 'nav-frontend-typografi';
import './kvitteringsopplasting.less';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import FilopplasterModal from '../../components/filopplaster/filopplasterModal/FilopplasterModal';
import OpplastedeFiler from '../../components/filopplaster/OpplastedeFiler';
// import DragAndDrop from '../../components/filopplaster/DragAndDrop';
import DragAndDrop from '../../components/filopplaster/dragAndDrop/DragAndDrop';
import TotalBelop from '../../components/kvittering/totaltBelop/TotaltBelop';
import { hjelpetekstKvitteringopplasting } from '../../constants/hjelpetekster';

const Kvitteringsopplasting: React.FC = (): ReactElement => (
  <div className="perioder-wrapper">
    <Innholdstittel className="perioder-overskrift">Opplasting av kvitteringer</Innholdstittel>
    <div className="kvitteringinfo-wrapper">
      <Ingress className="perioder-ingress"> Legg inn dine kvitteringer </Ingress>
      <Hjelpetekst className="kvitteringsopplasting-hjelpetekst">
        {hjelpetekstKvitteringopplasting.hjelpetekst}
      </Hjelpetekst>
    </div>
    <div className="filopplaster-wrapper periode-element">
      <div className="filopplaster">
        <FilopplasterModal />
        <DragAndDrop />
      </div>
      <OpplastedeFiler />
      <TotalBelop />
    </div>
  </div>
);

export default Kvitteringsopplasting;
