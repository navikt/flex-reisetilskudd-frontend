import React, { useState } from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import Modal from 'nav-frontend-modal';
import { Input } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { useParams } from 'react-router-dom';
import {
  KvitteringInterface, OpplastetKvitteringInterface, TransportmiddelAlternativer, Transportmiddel,
} from '../../../models/kvittering';
import Fil from '../fil/Fil';
import './filopplasterModal.less';
import env from '../../../utils/environment';
import { logger } from '../../../utils/logger';
import { post, put } from '../../../data/fetcher/fetcher';
import Datovelger from '../../kvittering/datovelger/Datovelger';
import { useAppStore } from '../../../data/stores/app-store';
import TransportmiddelKvittering from '../../kvittering/TransportmiddelKvittering';

const FilopplasterModal: React.FC = () => {
  Modal.setAppElement('#root'); // accessibility measure: https://reactcommunity.org/react-modal/accessibility/

  const { soknadsID } = useParams();
  const [laster, settLaster] = useState<boolean>(false);
  const [dato, settDato] = useState<Date | null>(null);
  const [beløp, settBeløp] = useState<number | null>(null);
  const {
    kvitteringer, settKvitteringer, transportmiddel, settTransportmiddel,
  } = useAppStore();

  const {
    uopplastetFil, settUopplastetFil,
    filopplasterFeilmeldinger, settFilopplasterFeilmeldinger,
    åpenFilopplasterModal, settÅpenFilopplasterModal,
  } = useAppStore();

  const nyKvittering = (kvittering: KvitteringInterface) => {
    settKvitteringer([...kvitteringer, kvittering]);
  };

  const lukkModal = () => {
    settUopplastetFil(null);
    settÅpenFilopplasterModal(false);
  };

  const validerBeløp = (nyttBeløp : number | null): boolean => {
    if (!nyttBeløp || nyttBeløp === null) {
      settFilopplasterFeilmeldinger(['Vennligst skriv inn et gyldig beløp']);
      return false;
    }
    if (nyttBeløp <= 0) {
      settFilopplasterFeilmeldinger(['Vennligst skriv inn et positivt beløp']);
      return false;
    }
    return true;
  };

  const validerDato = (nyDato: Date | null): boolean => {
    if (!nyDato || nyDato === null) {
      settFilopplasterFeilmeldinger(['Vennligst velg en gyldig dato']);
      return false;
    }
    return true;
  };

  const validerTransportmiddel = (nyttTransportmiddel: TransportmiddelAlternativer) => {
    if (nyttTransportmiddel === undefined) {
      settFilopplasterFeilmeldinger(['Vennligst velg et transportmiddel']);
      return false;
    }
    return true;
  };

  const oppdaterDato = (nyDato: Date): void => {
    if (validerDato(nyDato)) {
      settFilopplasterFeilmeldinger([]);
    }
    settDato(nyDato);
  };

  const lagreKvittering = (fil: File) => {
    const requestData = new FormData();
    requestData.append('file', fil);

    if (validerDato(dato) && validerBeløp(beløp) && validerTransportmiddel(transportmiddel)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      requestData.append('dato', dato!.toString());
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      requestData.append('beløp', beløp!.toString());

      settLaster(true);
      post<OpplastetKvitteringInterface>(`${env.mockBucketUrl}/kvittering`, requestData)
        .then((response) => {
          if (response.parsedBody?.id) {
            const kvittering: KvitteringInterface = {
              reisetilskuddId: soknadsID,
              navn: fil.name,
              storrelse: fil.size,
              belop: (beløp || 0.0),
              fom: (dato || new Date()),
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              kvitteringId: response.parsedBody!.id,
              transportmiddel: Object.entries(Transportmiddel)
                .find(([, v]) => v === transportmiddel)?.[0],
            };
            nyKvittering(kvittering);
            return kvittering;
          }
          logger.warn('Responsen inneholder ikke noen id', response.parsedBody);
          return null;
        })
        .then((kvittering) => {
          put<KvitteringInterface>(`${env.apiUrl}/kvittering`, kvittering)
            .then(() => {
              settLaster(false);
              lukkModal();
              settTransportmiddel(undefined);
            })
            .catch((error) => {
              logger.error('Feil under opplasting av kvittering', error);
            });
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
        <Systemtittel className="kvittering-header"> Ny kvittering </Systemtittel>
        <div className="input-rad">
          <Datovelger label="Dato" mode="single" onChange={(nyDato) => oppdaterDato(nyDato[0])} />
          <Input className="totalt-beløp-label" label="Totalt beløp" inputMode="numeric" pattern="[0-9]*" onChange={(e) => parseBelopInput(e.target.value)} />
        </div>
        <div>
          <TransportmiddelKvittering />
        </div>
        <Fil fil={uopplastetFil} className="opplastede-filer" />
        {laster
          ? (<NavFrontendSpinner className="lagre-kvittering-spinner" />)
          : (
            <Knapp
              htmlType="submit"
              className="lagre-kvittering"
              onClick={() => (
                uopplastetFil ? lagreKvittering(uopplastetFil) : logger.info('Noen har prøvd å laste opp en tom fil')
              )}
            >
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
