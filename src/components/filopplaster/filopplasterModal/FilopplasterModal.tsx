import React, { useState } from 'react';
import { Systemtittel, Element } from 'nav-frontend-typografi';
import Modal from 'nav-frontend-modal';
import {
  Feiloppsummering, FeiloppsummeringFeil, SkjemaGruppe, Input,
} from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { useParams } from 'react-router-dom';
import {
  KvitteringInterface, OpplastetKvitteringInterface, TransportmiddelAlternativer, Transportmiddel,
} from '../../../models/kvittering';
import Vis from '../../Vis';
import { useAppStore } from '../../../data/stores/app-store';
import TransportmiddelKvittering from '../../kvittering/TransportmiddelKvittering';
import {
  kvitteringTotaltBeløpSpørsmål,
  kvitteringDatoSpørsmål,
  kvitteringTransportmiddelSpørsmål,
} from '../../sporsmal/sporsmalTekster';
import Fil from '../fil/Fil';
import './filopplasterModal.less';
import env from '../../../utils/environment';
import { logger } from '../../../utils/logger';
import { post, put } from '../../../data/fetcher/fetcher';
import Datovelger from '../../kvittering/datovelger/Datovelger';
import { validerKroner, validerOgReturnerKroner } from '../../../utils/skjemavalidering';

const FilopplasterModal: React.FC = () => {
  Modal.setAppElement('#root'); // accessibility measure: https://reactcommunity.org/react-modal/accessibility/

  const { soknadsID } = useParams();
  const [laster, settLaster] = useState<boolean>(false);
  const [dato, settDato] = useState<Date | null>(null);
  const [beløp, settBeløp] = useState<string>('');
  const [valideringsFeil, settValideringsFeil] = useState<FeiloppsummeringFeil[]>([]);
  const [harAlleredeBlittValidert, settHarAlleredeBlittValidert] = useState<boolean>(false);
  const {
    kvitteringer, settKvitteringer,
    transportmiddelKvittering, settTransportmiddelKvittering,
    uopplastetFil, settUopplastetFil,
    åpenFilopplasterModal, settÅpenFilopplasterModal,
  } = useAppStore();

  const nyKvittering = (kvittering: KvitteringInterface) => {
    settKvitteringer([...kvitteringer, kvittering]);
  };

  const clearState = () => {
    settLaster(false);
    settDato(null);
    settBeløp('');
    settTransportmiddelKvittering(undefined);
    settUopplastetFil(null);
    settHarAlleredeBlittValidert(false);
    settValideringsFeil([]);
  };

  const lukkModal = () => {
    clearState();
    settÅpenFilopplasterModal(false);
  };

  const fåFeilmeldingTilInput = (
    hvilkenInput : string,
  ) : string | undefined => valideringsFeil.find(
    (element) => element.skjemaelementId === hvilkenInput,
  )?.feilmelding;

  const validerBeløp = (nyttBeløp : string | null): FeiloppsummeringFeil[] => {
    if (!nyttBeløp || nyttBeløp === null || !validerKroner(nyttBeløp)) {
      return [{
        skjemaelementId: kvitteringTotaltBeløpSpørsmål.id,
        feilmelding: 'Vennligst skriv inn et gyldig beløp',
      }];
    }
    return [];
  };

  const validerDato = (nyDato: Date | null): FeiloppsummeringFeil[] => {
    if (!nyDato || nyDato === null) {
      return [
        {
          skjemaelementId: kvitteringDatoSpørsmål.id,
          feilmelding: 'Vennligst velg en gyldig dato',
        },
      ];
    }
    return [];
  };

  const validerTransportmiddel = (nyttTransportmiddel: TransportmiddelAlternativer)
  : FeiloppsummeringFeil[] => {
    if (nyttTransportmiddel === undefined) {
      return [
        {
          skjemaelementId: kvitteringTransportmiddelSpørsmål.id,
          feilmelding: 'Vennligst velg minst ett transportmiddel',
        },
      ];
    }
    return [];
  };

  const validerKvittering = (
    nyttBeløp: string | null = null,
    nyDato : Date | null = null,
    nyttTransportmiddel : TransportmiddelAlternativer | null = null,
  ) => {
    const datoFeil = validerDato(nyDato || dato);
    const beløpFeil = validerBeløp(nyttBeløp || beløp);
    const transportmiddelFeil = validerTransportmiddel(
      nyttTransportmiddel
      || transportmiddelKvittering,
    );

    const nyeValideringsFeil = [...datoFeil, ...beløpFeil, ...transportmiddelFeil];
    settValideringsFeil(nyeValideringsFeil);
    settHarAlleredeBlittValidert(true);
    return nyeValideringsFeil.length === 0;
  };

  const lagreKvittering = (fil: File) => {
    const requestData = new FormData();
    requestData.append('file', fil);

    if (validerKvittering()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      requestData.append('dato', dato!.toString());
      requestData.append('beløp', beløp.toString());

      const parsedBeløp = validerOgReturnerKroner(beløp);
      if (parsedBeløp === null || Number.isNaN(parsedBeløp)) {
        logger.error('Bruker har fått til å validere et ugyldig beløp', beløp);
        return;
      }

      settLaster(true);
      post<OpplastetKvitteringInterface>(`${env.mockBucketUrl}/kvittering`, requestData)
        .then((response) => {
          if (response.parsedBody?.id) {
            const kvittering: KvitteringInterface = {
              reisetilskuddId: soknadsID,
              navn: fil.name,
              storrelse: fil.size,
              belop: parsedBeløp,
              fom: (dato || new Date()),
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              kvitteringId: response.parsedBody!.id,
              transportmiddel: Object.entries(Transportmiddel)
                .find(([, v]) => v === transportmiddelKvittering)?.[0],
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
              settTransportmiddelKvittering(undefined);
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

  const handleBeløpChange = (beløpString: string) => {
    settBeløp(beløpString);
    if (harAlleredeBlittValidert) {
      validerKvittering(beløpString, null, null);
    }
  };

  const oppdaterDato = (nyDato: Date): void => {
    settDato(nyDato);
    if (harAlleredeBlittValidert) {
      validerKvittering(null, nyDato, null);
    }
  };

  const handleTransportmiddelChange = (transportmiddel : TransportmiddelAlternativer) => {
    if (harAlleredeBlittValidert) {
      validerKvittering(null, null, transportmiddel);
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
          <Datovelger
            id={kvitteringDatoSpørsmål.id}
            className="periode-element"
            label="Dato"
            mode="single"
            onChange={(nyDato) => oppdaterDato(nyDato[0])}
            feil={fåFeilmeldingTilInput(kvitteringDatoSpørsmål.id)}
          />
          <div>
            <Element className="kvittering-beløp-input">{kvitteringTotaltBeløpSpørsmål.tittel}</Element>
            <Input
              inputMode={kvitteringTotaltBeløpSpørsmål.inputMode}
              value={beløp}
              pattern="[0-9]*"
              bredde={kvitteringTotaltBeløpSpørsmål.bredde}
              onChange={(e) => {
                handleBeløpChange(e.target.value);
              }}
              id={kvitteringTotaltBeløpSpørsmål.id}
              feil={fåFeilmeldingTilInput(kvitteringTotaltBeløpSpørsmål.id)}
            />
          </div>
        </div>
        <div>
          <SkjemaGruppe feil={fåFeilmeldingTilInput(kvitteringTransportmiddelSpørsmål.id)}>
            <TransportmiddelKvittering handleChange={(
              transportmiddel,
            ) => handleTransportmiddelChange(transportmiddel)}
            />
          </SkjemaGruppe>
        </div>
        <Fil fil={uopplastetFil} className="opplastede-filer" />
        {laster
          ? (<NavFrontendSpinner className="lagre-kvittering" />)
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
        <Vis hvis={valideringsFeil.length > 0}>
          <Feiloppsummering tittel="For å gå videre må du rette opp følgende:" feil={valideringsFeil} />
        </Vis>
      </div>
    </Modal>
  );
};

export default FilopplasterModal;
