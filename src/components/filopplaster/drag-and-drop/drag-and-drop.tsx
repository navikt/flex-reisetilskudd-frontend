import './drag-and-drop.less'

import { Normaltekst } from 'nav-frontend-typografi'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { useAppStore } from '../../../data/stores/app-store'
import env from '../../../utils/environment'
import { formaterFilstørrelse } from '../../../utils/fil-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'
import opplasting from './opplasting.svg'

const DragAndDrop = () => {
    const { setUopplastetFil, setOpenModal } = useAppStore()
    const [ filFeil, setFilFeil ] = useState<string[]>([])

    const tillatteFiltyper = env.tillatteFiltyper
    const maxFilstørrelse = env.maksFilstørrelse

    const onDropCallback = useCallback(
        (filer) => {
            filer.forEach((fil: File) => {
                setUopplastetFil(fil)
                setOpenModal(true)

                if (maxFilstørrelse && fil.size > maxFilstørrelse) {
                    const maks = formaterFilstørrelse(maxFilstørrelse)
                    filFeil.push(
                        getLedetekst(tekst('drag_and_drop.maks'), {
                            '%FILNAVN%': fil.name,
                            '%MAKSSTOR%': maks
                        })
                    )
                }

                if (tillatteFiltyper && !tillatteFiltyper.includes(fil.type)) {
                    filFeil.push(
                        getLedetekst(tekst('drag_and_drop.filtype'), {
                            '%FILNAVN%': fil.name,
                            '%TILLATTEFILTYPER%': tillatteFiltyper
                        })
                    )
                }

                setFilFeil(filFeil)
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
            <Normaltekst tag="span" className="tekst">
                {isDragActive
                    ? tekst('drag_and_drop.dragtekst.aktiv')
                    : tekst('drag_and_drop.dragtekst')
                }
            </Normaltekst>
        </div>
    )
}

export default DragAndDrop
