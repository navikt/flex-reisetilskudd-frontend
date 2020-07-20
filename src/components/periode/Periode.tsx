import React, { useState } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import FilopplasterModal from '../filopplaster/FilopplasterModal';
import { PeriodeInterface } from '../../models/periode';
import { Vedlegg } from '../../models/vedlegg';
import './Periode.less';
import Datovelger from '../datovelger/Datovelger';
import OpplastedeFiler from '../filopplaster/OpplastedeFiler';
import DragAndDrop from '../filopplaster/DragAndDrop';
import TotalBelop from './totaltBelop/TotaltBelop';
import PeriodeTittel from './periodeTittel/PeriodeTittel';
import TransportMiddelSporsmal from './transportmiddelSporsmal/TransportMiddelSporsmal';
import SlettPeriode from './slettPeriode/SlettPeriode';

interface Props {
  periode: PeriodeInterface,
  index?: number,
  onChange?: () => void
}

const tillatteFiltyper = ['image/png', 'image/jpeg'];
const maxFilstørrelse = 1024 * 1024;

const Periode: React.FC<Props> = ({ periode, index, onChange }) => {
  const [transportMiddel, settTransportMiddel] = useState();
  const [fraDato, settFraDato] = useState<Date | undefined>(periode.fraDato);
  const [tilDato, settTilDato] = useState<Date | undefined>(periode.tilDato);

  const oppdaterDato = (datoer: Date[]) => {
    if (datoer.length === 2) {
      settFraDato(datoer[0]);
      settTilDato(datoer[1]);
    }
  };

  const nårNyttVedlegg = (vedlegg: Vedlegg) => {
    periode.vedlegg.push(vedlegg);
    if (onChange) {
      onChange();
    }
  };

  const nårSlettVedlegg = (vedleggSomSkalSlettes: Vedlegg) => {
    // eslint-disable-next-line no-param-reassign
    periode.vedlegg = periode.vedlegg
      .filter((_vedlegg: Vedlegg) => _vedlegg.navn !== vedleggSomSkalSlettes.navn);
    if (onChange) {
      onChange();
    }
  };

  return (
    <Ekspanderbartpanel
      className="periode-panel"
      key={periode.id}
      tittel={<PeriodeTittel fraDato={fraDato} tilDato={tilDato} index={index} />}
    >
      <hr />
      <Datovelger className="periode-element" label="Dato" mode="range" onChange={(datoer) => { oppdaterDato(datoer); }} />
      <TransportMiddelSporsmal
        periode={periode}
        settTransportMiddel={settTransportMiddel}
        transportMiddel={transportMiddel}
      />
      {TotalBelop(periode)}
      <div className="filopplaster-wrapper periode-element">
        <OpplastedeFiler
          className="opplastede-filer"
          filliste={periode.vedlegg}
          slettVedlegg={nårSlettVedlegg}
        />
        <div className="filopplaster">
          <FilopplasterModal nårNyttVedlegg={nårNyttVedlegg} />
          <DragAndDrop tillatteFiltyper={tillatteFiltyper} maxFilstørrelse={maxFilstørrelse} />
        </div>
      </div>
      <SlettPeriode slettPeriode={() => {}} periode={periode} />
    </Ekspanderbartpanel>
  );
};

export default Periode;
