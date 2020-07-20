import React, { ReactElement, useState } from 'react';
import './slettPeriode.less';
import { Fareknapp, Knapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { SlettIkon } from '../../../assets/ikoner';
import { PeriodeInterface } from '../../../models/periode';
import totaltBeløp from '../totaltBelop/totalBelop';

interface Props {
  slettPeriode: () => void;
  periode: PeriodeInterface;
}

const SlettPeriode = ({ slettPeriode, periode } : Props) : ReactElement => {
  const [åpenSlettPeriodeModal, settÅpenSlettPeriodeModal] = useState<boolean>(false);

  const lukkModal = () => {
    settÅpenSlettPeriodeModal(false);
  };

  const åpneModal = () => {
    settÅpenSlettPeriodeModal(true);
  };

  const antallVedlegg = () => periode.vedlegg.length;

  const håndterSlettKnappKlikk = () => {
    if (antallVedlegg() > 0 || totaltBeløp(periode) > 0) {
      åpneModal();
    } else {
      slettPeriode();
    }
  };

  const fåFaretekst = () => {
    const antVedlegg = antallVedlegg();
    const totalBelop = totaltBeløp(periode);
    return `Er du sikker på at du vil slette perioden?
    ${(antVedlegg > 0 && totalBelop > 0) ? `Perioden inneholder ${antVedlegg === 1 ? 'ett' : antVedlegg} vedlegg med en totalsum på ${totaltBeløp(periode)} ${totalBelop > 1 ? 'kroner.' : 'krone.'}` : ''}`;
  };

  return (
    <>
      <Fareknapp className="slett-periode-knapp" mini onClick={håndterSlettKnappKlikk}>
        <SlettIkon />
        <span>SLETT PERIODE</span>
      </Fareknapp>
      <Modal
        isOpen={åpenSlettPeriodeModal}
        onRequestClose={lukkModal}
        closeButton
        contentLabel="Modal"
        className="slett-periode-modal"
      >
        <div className="slett-periode-modal-content">
          <Undertittel className="slett-periode-modal-header"> Slette perioden?</Undertittel>
          <Normaltekst>
            {fåFaretekst()}
          </Normaltekst>
          <Fareknapp className="slett-periode-knapp-bekreft" mini onClick={slettPeriode}>
            <SlettIkon />
            <span>SLETT PERIODE</span>
          </Fareknapp>
          <Knapp className="slett-periode-knapp-avbryt" mini onClick={lukkModal}>
            <span>AVBRYT</span>
          </Knapp>
        </div>
      </Modal>
    </>
  );
};

export default SlettPeriode;
