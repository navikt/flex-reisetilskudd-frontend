import React, { ReactElement, useState } from 'react';
import {
  Innholdstittel, Ingress,
} from 'nav-frontend-typografi';
import './kvitteringsopplasting.less';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { useParams } from 'react-router-dom';
import FilopplasterModal from '../../components/filopplaster/filopplasterModal/FilopplasterModal';
import OpplastedeFiler from '../../components/filopplaster/OpplastedeFiler';
// import DragAndDrop from '../../components/filopplaster/DragAndDrop';
import DragAndDrop from '../../components/filopplaster/dragAndDrop/DragAndDrop';
import TotalBelop from '../../components/kvittering/totaltBelop/TotaltBelop';
import { hjelpetekstKvitteringopplasting } from '../../constants/hjelpetekster';
import VidereKnapp from '../../components/knapper/VidereKnapp';

const Kvitteringsopplasting: React.FC = (): ReactElement => {
  const [gårTilNesteSide, settGårTilNesteSide] = useState<boolean>(false);

  const { soknadssideID } = useParams();
  const soknadssideIDTall = Number(soknadssideID);

  const handleVidereKlikk = () => {
    settGårTilNesteSide(true);
  };

  return (
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
        <OpplastedeFiler fjernKnapp />
        <TotalBelop />
      </div>
      <VidereKnapp
        aktivtSteg={soknadssideIDTall}
        onClick={handleVidereKlikk}
        skalGåTilNesteSideNå={gårTilNesteSide}
      />
    </div>
  );
};

export default Kvitteringsopplasting;
