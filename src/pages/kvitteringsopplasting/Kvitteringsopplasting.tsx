import React, { ReactElement } from 'react';
import {
  Innholdstittel, Ingress,
} from 'nav-frontend-typografi';
import './kvitteringsopplasting.less';
import FilopplasterModal from '../../components/filopplaster/FilopplasterModal';
import OpplastedeFiler from '../../components/filopplaster/OpplastedeFiler';
import DragAndDrop from '../../components/filopplaster/DragAndDrop';
import TotalBelop from '../../components/kvittering/totaltBelop/TotaltBelop';

const Kvitteringsopplasting: React.FC = () : ReactElement => (
  <div className="perioder-wrapper">
    <Innholdstittel className="perioder-overskrift">Opplasting av kvitteringer</Innholdstittel>
    <Ingress className="perioder-overskrift"> Legg inn dine kvitteringer </Ingress>
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
