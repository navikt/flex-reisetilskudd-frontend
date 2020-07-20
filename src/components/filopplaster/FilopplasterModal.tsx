import React, { useState } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import Modal from 'nav-frontend-modal';
import { Input } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { VedleggInterface, OpplastetVedleggInterface } from '../../models/vedlegg';
import Fil from './Fil';
import './Filopplaster.less';
import env from '../../utils/environment';
import { logger } from '../../utils/logger';
import { post } from '../../data/fetcher/fetcher';
import Datovelger from '../datovelger/Datovelger';
import { useAppStore } from '../../data/stores/app-store';

interface Props {
  nårNyttVedlegg?: (vedlegg: VedleggInterface) => void;
}

const FilopplasterModal: React.FC<Props> = ({
  nårNyttVedlegg,
}) => {
  Modal.setAppElement('#root'); // accessibility measure: https://reactcommunity.org/react-modal/accessibility/

  const [laster, settLaster] = useState<boolean>(false);
  const [dato, settDato] = useState<Date | null>(null);
  const [beløp, settBeløp] = useState<number | null>(null);

  const {
    uopplastetFil, settUopplastetFil,
    filopplasterFeilmeldinger, settFilopplasterFeilmeldinger,
    åpenFilopplasterModal, settÅpenFilopplasterModal,
  } = useAppStore();

  const lukkModal = () => {
    settUopplastetFil(null);
    settÅpenFilopplasterModal(false);
  };

  const validerBeløp = (_beløp: number | null): boolean => {
    if (!_beløp || _beløp === null) {
      settFilopplasterFeilmeldinger(['Vennligst skriv inn et gyldig beløp']);
      return false;
    }
    if (_beløp <= 0) {
      settFilopplasterFeilmeldinger(['Vennligst skriv inn et positivt beløp']);
      return false;
    }
    return true;
  };

  const validerDato = (_dato: Date | null): boolean => {
    if (!_dato || _dato === null) {
      settFilopplasterFeilmeldinger(['Vennligst velg en gyldig dato']);
      return false;
    }
    return true;
  };

  const oppdaterDato = (_dato: Date): void => {
    if (validerDato(_dato)) {
      settFilopplasterFeilmeldinger([]);
    }
    settDato(_dato);
  };

  const lagreVedlegg = (fil: File) => {
    const requestData = new FormData();
    requestData.append('file', fil);

    if (validerDato(dato) && validerBeløp(beløp)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      requestData.append('dato', dato!.toString());
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      requestData.append('beløp', beløp!.toString());

      settLaster(true);
      post<OpplastetVedleggInterface>(`${env.mockApiUrl}/kvittering`, requestData)
        .then((response) => {
          if (response.parsedBody?.dokumentId) {
            const nyttVedlegg: VedleggInterface = {
              navn: fil.name,
              størrelse: fil.size,
              beløp: (beløp || 0.0),
              dato: (dato || new Date()),
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              dokumentId: response.parsedBody!.dokumentId,
            };
            if (nårNyttVedlegg) {
              nårNyttVedlegg(nyttVedlegg);
            }
          } else {
            logger.warn('Responsen inneholder ikke noen dokumentId', response.parsedBody);
          }
        })
        .then(() => {
          settLaster(false);
          lukkModal();
        })
        .catch((error) => {
          logger.error('Feil under opplasting av kvittering', error);
        });
    }
  };

  const parseBelopInput = (belopString: string) => {
    try {
      const kommaTilPunktum = belopString.replace(',', '.');
      const inputBelop = parseFloat(kommaTilPunktum);
      if (validerBeløp(inputBelop)) {
        settFilopplasterFeilmeldinger([]);
        settBeløp(inputBelop);
      }
    } catch {
      settFilopplasterFeilmeldinger(['Vennligst bruk tall i inputfeltet']);
    }
  };

  return (
    <Modal
      isOpen={åpenFilopplasterModal}
      onRequestClose={() => lukkModal()}
      closeButton
      contentLabel="Modal"
      className="filopplaster-modal"
    >
      <div className="modal-content">
        <Undertittel className="kvittering-header"> Ny kvittering </Undertittel>
        <div className="input-rad">
          <Datovelger className="periode-element" label="Dato" mode="single" onChange={(_dato) => oppdaterDato(_dato[0])} />
          <Input label="Totalt beløp" inputMode="numeric" pattern="[0-9]*" onChange={(e) => parseBelopInput(e.target.value)} />
        </div>
        <Fil fil={uopplastetFil} className="opplastede-filer" />
        {laster
          ? (<NavFrontendSpinner className="lagre-kvittering-spinner" />)
          : (
            <Knapp htmlType="submit" className="lagre-kvittering" onClick={() => (uopplastetFil ? lagreVedlegg(uopplastetFil) : logger.info('Noen har prøvd å laste opp en tom fil'))}>
              Lagre kvittering
            </Knapp>
          )}
        <div className="filopplasterFeilmeldinger" aria-live="polite">
          {filopplasterFeilmeldinger.map((feilmelding) => (
            <AlertStripeFeil key={feilmelding} className="feilmelding-alert">
              {feilmelding}
            </AlertStripeFeil>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default FilopplasterModal;
