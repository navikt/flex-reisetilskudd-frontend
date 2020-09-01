import './drag-and-drop.less'

import { Normaltekst } from 'nav-frontend-typografi'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import opplasting from '../../../assets/opplasting.svg'
import { useAppStore } from '../../../data/stores/app-store'
import env from '../../../utils/environment'
import formaterFilstørrelse from '../utils'

const DragAndDrop = () => {
    const {
        settUopplastetFil,
        filopplasterFeilmeldinger, settFilopplasterFeilmeldinger,
        settÅpenFilopplasterModal,
    } = useAppStore()

    const { tillatteFiltyper } = env
    const maxFilstørrelse = env.maksFilstørrelse

    const onDropCallback = useCallback(
        (filer) => {
            filer.forEach((fil: File) => {
                settUopplastetFil(fil)
                if (maxFilstørrelse && fil.size > maxFilstørrelse) {
                    const maks = formaterFilstørrelse(maxFilstørrelse)
                    settFilopplasterFeilmeldinger([ ...filopplasterFeilmeldinger, `Filen ${fil.name} er for stor. Maks filstørrelse er ${maks}` ])
                    return
                }

                if (tillatteFiltyper && !tillatteFiltyper.includes(fil.type)) {
                    settFilopplasterFeilmeldinger([ ...filopplasterFeilmeldinger, `Filtypen til ${fil.name} er ugyldig. Gyldige typer er ${tillatteFiltyper}` ])
                    return
                }

                settFilopplasterFeilmeldinger([])
                settÅpenFilopplasterModal(true)
            })
        },
        // eslint-disable-next-line
        []
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onDropCallback,
        multiple: false,
    })

    const dropText = isDragActive ? 'Slipp filen her...' : 'Last opp dokumentasjon'

    return (
        <div className="filopplasteren" {...getRootProps()}>
            <input {...getInputProps()} />
            <img src={opplasting}
                className="opplastingsikon"
                alt="Opplastingsikon"
            />
            <Normaltekst className="tekst">
                {dropText}
            </Normaltekst>
        </div>
    )
}

export default DragAndDrop
