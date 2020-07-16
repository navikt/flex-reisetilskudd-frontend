/* eslint-disable */
import React, { useState, useCallback } from 'react';
import { Normaltekst, Undertittel, Feilmelding, Ingress } from 'nav-frontend-typografi';
import Modal from 'nav-frontend-modal';
import { useDropzone } from 'react-dropzone';
import { Input } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import opplasting from '../../assets/opplasting.svg';
import formaterFilstørrelse from './utils';
import { IVedlegg, IOpplastetVedlegg } from '../../models/vedlegg';
import OpplastedeFiler from './OpplastedeFiler';
import Fil from './Fil';
import ReisetilskuddDatovelger from '../dato/ReisetilskuddDatovelger';
import './Filopplaster.less';
import env from '../../utils/environment';
import { logger } from '../../utils/logger';
import { post } from '../../data/fetcher/fetcher';
import { func } from 'prop-types';

interface Props {
  tillatteFiltyper?: string[];
  maxFilstørrelse?: number;
  className?: string;
}

const Filopplaster: React.FC<Props> = ({ tillatteFiltyper, maxFilstørrelse, className }) => {
  Modal.setAppElement('#root'); // accessibility measure: https://reactcommunity.org/react-modal/accessibility/

  const [feilmeldinger, settFeilmeldinger] = useState<string[]>([]);
  const [vedlegg, settVedlegg] = useState<IVedlegg[]>([]);
  const [laster, settLaster] = useState<boolean>(false);

  const [åpenModal, settÅpenModal] = useState<boolean>(false);
  const [uopplastetFil, settUopplastetFil] = useState<File | null>(null);
  const [dato, settDato] = useState<Date | null >(null);
  const [beløp, settBeløp] = useState<number | null>(null);

  const lukkModal = () => {
    settUopplastetFil(null);
    settÅpenModal(false);
  };

  const onDropCallback = useCallback(
    (filer) => {
      filer.forEach((fil: File) => {
        settUopplastetFil(fil);
        if (maxFilstørrelse && fil.size > maxFilstørrelse) {
          const maks = formaterFilstørrelse(maxFilstørrelse);
          settFeilmeldinger([...feilmeldinger, `Filen ${fil.name} er for stor. Maks filstørrelse er ${maks}`]);
          return;
        }

        if (tillatteFiltyper && !tillatteFiltyper.includes(fil.type)) {
          settFeilmeldinger([...feilmeldinger, `Filtypen til ${fil.name} er ugyldig. Gyldige typer er ${tillatteFiltyper}`]);
          return;
        }

        settFeilmeldinger([]);
        settÅpenModal(true);
      });
    },
    // eslint-disable-next-line
    []
  );

  const oppdaterDato = (dato: Date) : void => {
    if (validerDato(dato)){
      settFeilmeldinger([]);
    }
    settDato(dato)
  }

  const validerDato = (dato: Date | null) : boolean => {
    if (!dato || dato === null){
      settFeilmeldinger([`Vennligst velg en gyldig dato`])
      return false
    }
    return true;
  }
  
  const validerBeløp = (beløp: number | null) : boolean => {
    if (!beløp || beløp === null){
      settFeilmeldinger([`Vennligst skriv inn et gyldig beløp`])
      return false
    }
    if (beløp! <= 0){
      settFeilmeldinger([`Vennligst skriv inn et positivt beløp`])
      return false;
    }
    return true;
  }

  const lagreVedlegg = (fil: File) => {
    const requestData = new FormData();
    requestData.append('file', fil);

    if (validerDato(dato) && validerBeløp(beløp)) {
      requestData.append('dato', dato!.toString());
      requestData.append('beløp', beløp!.toString());

      settLaster(true)
      post<IOpplastetVedlegg>(`${env.mockApiUrl}/kvittering`, requestData)
      .then((response) => {
        if (response.parsedBody?.dokumentId) {
          settVedlegg((gamleVedlegg) => [...gamleVedlegg, {
            navn: fil.name,
            størrelse: fil.size,
            dokumentId: response.parsedBody?.dokumentId,
          }]);
        } else {
          logger.warn('Responsen inneholder ikke noen dokumentId', response.parsedBody);
        }
      })
      .then(() => { 
        settLaster(false)
        lukkModal()
      })
      .catch((error) => {
        logger.error('Feil under opplasting av kvittering', error);
      });
    }
  };

  const slettVedlegg = (fil: IVedlegg) => {
    const opplastedeVedlegg = vedlegg;
    const nyVedleggsliste = opplastedeVedlegg.filter((obj: IVedlegg) => obj.navn !== fil.navn);
    settVedlegg(nyVedleggsliste);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    multiple: false,
  });

  const parseBelopInput = (belopString: string) => {
    try{
      const kommaTilPunktum = belopString.replace(",", ".");
      const inputBelop = parseFloat(kommaTilPunktum);
      if (validerBeløp(inputBelop)){
        settFeilmeldinger([]);
        settBeløp(inputBelop);
      }
    }
    catch{
      settFeilmeldinger(['Vennligst bruk tall i inputfeltet' ]);
    }
    return;
    
  }

  return (
    <div className={`filopplaster-wrapper ${className}`}>
      <OpplastedeFiler
        className="opplastede-filer"
        filliste={vedlegg}
        slettVedlegg={slettVedlegg}
      />
      <div className="filopplaster">
        <Modal
          isOpen={åpenModal}
          onRequestClose={() => lukkModal()}
          closeButton
          contentLabel="Modal"
          className="filopplaster-modal"
        >
          <div className="modal-content">
            { laster? 
              (<Ingress>Laster siden</Ingress>)
              :
              (<></>)
            }
            <Undertittel className="kvittering-header"> Ny kvittering </Undertittel>
            <div className="input-rad">
              <ReisetilskuddDatovelger label="Dato" onChange={(dato) => oppdaterDato(dato)}/>
              <Input label="Totalt beløp" inputMode="numeric" pattern="[0-9]*" onChange={(e) => parseBelopInput(e.target.value) } />
            </div>
            <Fil fil={uopplastetFil} className="opplastede-filer" />
            <Knapp htmlType="submit" className="lagre-kvittering" onClick={() => (uopplastetFil ? lagreVedlegg(uopplastetFil) : logger.info('Noen har prøvd å laste opp en tom fil'))}>
              Lagre kvittering
            </Knapp>
            <div className="feilmeldinger" aria-live="polite">
              {feilmeldinger.map((feilmelding) => (
                <AlertStripeFeil key={feilmelding} className="feilmelding-alert">
                  {feilmelding}
                </AlertStripeFeil>
              ))}
          </div>
          </div>
        </Modal>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <>
              <img
                src={opplasting}
                className="opplastingsikon"
                alt="Opplastingsikon"
              />
              <Normaltekst className="tekst">
                Slipp filen her...
              </Normaltekst>
            </>
          ) : (
            <>
              <img
                src={opplasting}
                className="opplastingsikon"
                alt="Opplastingsikon"
              />
              <Normaltekst className="tekst">
                Last opp dokumentasjon
              </Normaltekst>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Filopplaster;
