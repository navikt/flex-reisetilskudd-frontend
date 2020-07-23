import React, { ReactElement } from 'react';
import {
  Innholdstittel, Ingress,
} from 'nav-frontend-typografi';
import './kvitteringsopplasting.less';
import FilopplasterModal from '../../components/filopplaster/FilopplasterModal';
import OpplastedeFiler from '../../components/filopplaster/OpplastedeFiler';
import DragAndDrop from '../../components/filopplaster/DragAndDrop';
import TotalBelop from '../../components/periode/totaltBelop/TotaltBelop';
import TransportMiddelSporsmal from '../../components/periode/transportmiddelSporsmal/TransportMiddelSporsmal';

const Kvitteringsopplasting: React.FC = () : ReactElement => (
  <div className="perioder-wrapper">
    <Innholdstittel className="perioder-overskrift">Opplasting av kvitteringer</Innholdstittel>
    <Ingress className="perioder-overskrift"> Legg inn dine perioder og kvitteringer </Ingress>
    <TransportMiddelSporsmal />
    <TotalBelop />
    <div className="filopplaster-wrapper periode-element">
      <OpplastedeFiler />
      <div className="filopplaster">
        <FilopplasterModal />
        <DragAndDrop />
      </div>
    </div>
  </div>
);

export default Kvitteringsopplasting;
