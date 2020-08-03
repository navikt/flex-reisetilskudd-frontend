import React, { useCallback, ReactElement } from 'react';
import { useDropzone } from 'react-dropzone';
import { Normaltekst } from 'nav-frontend-typografi';
import opplasting from '../../../assets/opplasting.svg';
import { useAppStore } from '../../../data/stores/app-store';
import formaterFilstørrelse from '../utils';
import env from '../../../utils/environment';
import './dragAndDrop.less';

const DragAndDrop: React.FC = (): ReactElement => {
  const {
    settUopplastetFil,
    filopplasterFeilmeldinger, settFilopplasterFeilmeldinger,
    settÅpenFilopplasterModal,
  } = useAppStore();

  const { tillatteFiltyper } = env;
  const maxFilstørrelse = env.maksFilstørrelse;

  const onDropCallback = useCallback(
    (filer) => {
      filer.forEach((fil: File) => {
        settUopplastetFil(fil);
        if (maxFilstørrelse && fil.size > maxFilstørrelse) {
          const maks = formaterFilstørrelse(maxFilstørrelse);
          settFilopplasterFeilmeldinger([...filopplasterFeilmeldinger, `Filen ${fil.name} er for stor. Maks filstørrelse er ${maks}`]);
          return;
        }

        if (tillatteFiltyper && !tillatteFiltyper.includes(fil.type)) {
          settFilopplasterFeilmeldinger([...filopplasterFeilmeldinger, `Filtypen til ${fil.name} er ugyldig. Gyldige typer er ${tillatteFiltyper}`]);
          return;
        }

        settFilopplasterFeilmeldinger([]);
        settÅpenFilopplasterModal(true);
      });
    },
    // eslint-disable-next-line
        []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    multiple: false,
  });

  return (
    <div className="fillopplasteren" {...getRootProps()}>
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
  );
};

export default DragAndDrop;
