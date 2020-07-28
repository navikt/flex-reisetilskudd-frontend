import React from 'react';
import { Element } from 'nav-frontend-typografi';
import FilMedInfo from './filMedInfo/FilMedInfo';
import { KvitteringInterface } from '../../models/kvittering';
import Vis from '../Vis';
import { useAppStore } from '../../data/stores/app-store';

interface Props {
  fjernKnapp?: boolean;
}

const OpplastedeFiler: React.FC<Props> = ({ fjernKnapp }) => {
  const { kvitteringer } = useAppStore();

  return (
    <div className="opplastede-filer">
      <Vis hvis={kvitteringer.length > 0}>
        <div className="kvitteringstitler">
          <Element className="kvittering-tittel">Kvittering</Element>
          <Element className="belop-tittel">Beløp</Element>
          <Element className="dato-tittel">Dato</Element>
        </div>
      </Vis>
      {kvitteringer.map((fil: KvitteringInterface, index: number) => (
        <div key={fil.id}>
          <FilMedInfo fil={fil} fjernKnapp={fjernKnapp} />
          {index === kvitteringer.length - 1 ? '' : <hr />}
        </div>
      ))}
    </div>
  );
};

export default OpplastedeFiler;
