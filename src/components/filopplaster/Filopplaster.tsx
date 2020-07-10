import React, { useState, useCallback } from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Modal from 'nav-frontend-modal';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { useDropzone } from 'react-dropzone';
import { Input } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import opplasting from '../../assets/opplasting.svg';
import formaterFilstørrelse from './utils';
import { IVedlegg } from '../../models/vedlegg';
import OpplastedeFiler from './OpplastedeFiler';
import { logger } from '../../utils/logger';
import ReisetilskuddDatovelger from '../dato/ReisetilskuddDatovelger';

interface Props {
  tillatteFiltyper?: string[];
  maxFilstørrelse?: number;
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
      const feilmeldingsliste: string[] = [];
      const nyeVedlegg : IVedlegg[] = [];

      filer.forEach((fil: File) => {
        logger.info(`Prøver å laste opp fil ${fil.name}`);
        if (maxFilstørrelse && fil.size > maxFilstørrelse) {
          const maks = formaterFilstørrelse(maxFilstørrelse);
          feilmeldingsliste.push(`Filen ${fil.name} er for stor. Maks filstørrelse er ${maks}`);
          settFeilmeldinger(feilmeldingsliste);
          return;
        }

        if (tillatteFiltyper && !tillatteFiltyper.includes(fil.type)) {
          feilmeldingsliste.push(`Filtypen til ${fil.name} er ugyldig. Gyldige typer er ${tillatteFiltyper}`);
          settFeilmeldinger(feilmeldingsliste);
          return;
        }

        const requestData = new FormData();
        requestData.append('file', fil);

        nyeVedlegg.push({
          navn: fil.name,
          størrelse: fil.size,
        });

        settVedlegg([...vedlegg, ...nyeVedlegg]);

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
      <ReisetilskuddDatovelger />
      <div className="tittel-wrapper">
        <div className="opplastede-filer">
          <OpplastedeFiler
            filliste={vedlegg}
            slettVedlegg={slettVedlegg}
          />
        </div>
      </div>
      <div className="filopplaster">
        <Modal
          isOpen={åpenModal}
          onRequestClose={() => lukkModal()}
          closeButton
          contentLabel="Modal"
          className="filopplaster-modal"
        >
          <div className="modal-content">
            <div className="kvittering-header">
              <Undertittel> Ny kvittering</Undertittel>
            </div>
            <div className="input-rad">
              <Input className="kvittering-input" label="Dato" />
              <Input className="kvittering-input" label="Totalt beløp" inputMode="numeric" />
            </div>
            <div className="opplastede-filer">
              <OpplastedeFiler filliste={vedlegg} />
            </div>
            <Knapp className="lagre-kvittering">
              Lagre kvittering
            </Knapp>
            <div className="feilmelding">
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
