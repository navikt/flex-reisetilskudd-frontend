import './drag-and-drop.less'

import { Normaltekst } from 'nav-frontend-typografi'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import opplasting from '../../../assets/opplasting.svg'
import { useAppStore } from '../../../data/stores/app-store'
import env from '../../../utils/environment'
import formaterFilstørrelse from '../../../utils/fil-utils'

const DragAndDrop = () => {
    const {
        setUopplastetFil,
        filopplasterFeilmeldinger, setFilopplasterFeilmeldinger,
        setÅpenFilopplasterModal,
    } = useAppStore()

    const { tillatteFiltyper } = env
    const maxFilstørrelse = env.maksFilstørrelse

    const onDropCallback = useCallback(
        (filer) => {
            filer.forEach((fil: File) => {
                setUopplastetFil(fil)
                if (maxFilstørrelse && fil.size > maxFilstørrelse) {
                    const maks = formaterFilstørrelse(maxFilstørrelse)
                    setFilopplasterFeilmeldinger([ ...filopplasterFeilmeldinger, `Filen ${fil.name} er for stor. Maks filstørrelse er ${maks}` ])
                    return
                }

                if (tillatteFiltyper && !tillatteFiltyper.includes(fil.type)) {
                    setFilopplasterFeilmeldinger([ ...filopplasterFeilmeldinger, `Filtypen til ${fil.name} er ugyldig. Gyldige typer er ${tillatteFiltyper}` ])
                    return
                }

                setFilopplasterFeilmeldinger([])
                setÅpenFilopplasterModal(true)
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
