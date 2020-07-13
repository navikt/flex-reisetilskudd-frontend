/* eslint-disable */
import React, { useState, useCallback } from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Modal from 'nav-frontend-modal';
import { useDropzone } from 'react-dropzone';
import { Input } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import opplasting from '../../assets/opplasting.svg';
import formaterFilstørrelse from './utils';
import { IVedlegg, IOpplastetVedlegg } from '../../models/vedlegg';
import OpplastedeFiler from './OpplastedeFiler';
import ReisetilskuddDatovelger from '../dato/ReisetilskuddDatovelger';
import './Filopplaster.less';
import env from '../../utils/environment';

interface Props {
  tillatteFiltyper?: string[];
  maxFilstørrelse?: number;
}

async function get<T>(
  path: string,
  args: RequestInit = { method: 'get' },
): Promise<HttpResponse<T>> {
  return await fetcher<T>(new Request(path, args));
}

async function post<T>(
  path: string,
  body: any,
  args: RequestInit = { method: 'post', body: JSON.stringify(body) },
): Promise<HttpResponse<T>> {
  return await fetcher<T>(new Request(path, args));
}

interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

async function fetcher<T>(
  request: RequestInfo,
): Promise<HttpResponse<T>> {
  const response : HttpResponse<T> = await fetch(request);
  try {
    response.parsedBody = await response.json();
  } catch (ex) {}
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

const Filopplaster: React.FC<Props> = ({ tillatteFiltyper, maxFilstørrelse }) => {
  const [feilmeldinger, settFeilmeldinger] = useState<string[]>([]);
  const [vedlegg, settVedlegg] = useState<IVedlegg[]>([]);
  const [åpenModal, settÅpenModal] = useState<boolean>(false);

  const lukkModal = () => {
    settÅpenModal(false);
  };

  const onDropCallback = useCallback(
    (filer) => {
      const nyeVedlegg: IVedlegg[] = [];

      filer.forEach((fil: File) => {
        if (maxFilstørrelse && fil.size > maxFilstørrelse) {
          const maks = formaterFilstørrelse(maxFilstørrelse);
          settFeilmeldinger([...feilmeldinger, `Filen ${fil.name} er for stor. Maks filstørrelse er ${maks}`]);
          return;
        }

        if (tillatteFiltyper && !tillatteFiltyper.includes(fil.type)) {
          settFeilmeldinger([...feilmeldinger, `Filtypen til ${fil.name} er ugyldig. Gyldige typer er ${tillatteFiltyper}`]);
          return;
        }

        const requestData = new FormData();
        requestData.append('file', fil);

        post<IOpplastetVedlegg>(`${env.mockApiUrl}/kvitteringer`, requestData)
          .then((response) => {
            console.log('Response', response);
            if (response.parsedBody?.dokumentId) {
              console.log('Mottok dokumentId', response.parsedBody.dokumentId);
              nyeVedlegg.push({
                navn: fil.name,
                størrelse: fil.size,
                dokumentId: response.parsedBody?.dokumentId,
              });
            } else {
              console.log('Response does not contain dokumentId');
            }
          })
          .catch((error) => {
            console.log('Vi får en feil');
            console.log(error);
          });

        settFeilmeldinger([]);
        settVedlegg((gamleVedlegg) => [...gamleVedlegg, ...nyeVedlegg]);
        settÅpenModal(true);
      });
    },
    // eslint-disable-next-line
    []
  );

  const slettVedlegg = (fil: IVedlegg) => {
    const opplastedeVedlegg = vedlegg;
    const nyVedleggsliste = opplastedeVedlegg.filter((obj: IVedlegg) => obj.navn !== fil.navn);
    settVedlegg(nyVedleggsliste);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    multiple: false,
  });

  return (
    <div className="filopplaster-wrapper">
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
            <Undertittel className="kvittering-header"> Ny kvittering</Undertittel>
            <div className="input-rad">
              <ReisetilskuddDatovelger label="Dato" />
              <Input label="Totalt beløp" inputMode="numeric" pattern="[0-9]*" />
            </div>
            <OpplastedeFiler className="opplastede-filer" filliste={vedlegg} />
            <Knapp className="lagre-kvittering">
              Lagre kvittering
            </Knapp>
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

        <div className="feilmeldinger" aria-live="polite">
          {feilmeldinger.map((feilmelding) => (
            <AlertStripeFeil key={feilmelding} className="feilmelding-alert">
              {feilmelding}
            </AlertStripeFeil>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Filopplaster;
