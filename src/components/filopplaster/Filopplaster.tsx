import React, { useState, useCallback } from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Modal from 'nav-frontend-modal';
import { useDropzone } from 'react-dropzone';
import { Input } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import opplasting from '../../assets/opplasting.svg';
import formaterFilstørrelse from './utils';
import { IVedlegg } from '../../models/vedlegg';
import OpplastedeFiler from './OpplastedeFiler';
import ReisetilskuddDatovelger from '../dato/ReisetilskuddDatovelger';
import './Filopplaster.less';

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
      const nyeVedlegg : IVedlegg[] = [];

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

        nyeVedlegg.push({
          navn: fil.name,
          størrelse: fil.size,
        });

        settFeilmeldinger([]);
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
            <div>
              <Undertittel className="kvittering-header"> Ny kvittering</Undertittel>
              <div className="input-rad">
                <ReisetilskuddDatovelger label="Dato" />
                <Input label="Totalt beløp" inputMode="numeric" pattern="[0-9]*" />
              </div>
              <div className="opplastede-filer">
                <OpplastedeFiler filliste={vedlegg} />
              </div>
              <Knapp className="lagre-kvittering">
                Lagre kvittering
              </Knapp>
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

        <div className="feilmeldinger">
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
