import './drag-and-drop.less'

import { Normaltekst } from 'nav-frontend-typografi'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import opplasting from '../../../assets/opplasting.svg'
import { useAppStore } from '../../../data/stores/app-store'
import env from '../../../utils/environment'
import formaterFilstørrelse from '../../../utils/fil-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'

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
                    setFilopplasterFeilmeldinger([
                        ...filopplasterFeilmeldinger,
                        getLedetekst(tekst('drag_and_drop.maks'), {
                            '%FILNAVN%': fil.name,
                            '%MAKSSTOR%': maks
                        })
                    ])
                    return
                }

                if (tillatteFiltyper && !tillatteFiltyper.includes(fil.type)) {
                    setFilopplasterFeilmeldinger([
                        ...filopplasterFeilmeldinger,
                        getLedetekst(tekst('drag_and_drop.maks'), {
                            '%FILNAVN%': fil.name,
                            '%TILLATTEFILTYPER%': tillatteFiltyper
                        })
                    ])
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

    return (
        <div className="filopplasteren" {...getRootProps()}>
            <input {...getInputProps()} />
            <img src={opplasting} className="opplastingsikon" alt="Opplastingsikon" />
            <Normaltekst className="tekst">
                {isDragActive
                    ? tekst('drag_and_drop.dragtekst.aktiv')
                    : tekst('drag_and_drop.dragtekst')
                }
            </Normaltekst>
        </div>
    )
}

export default DragAndDrop
