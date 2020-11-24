import './drag-and-drop.less'

import { Normaltekst } from 'nav-frontend-typografi'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { useAppStore } from '../../../data/stores/app-store'
import env from '../../../utils/environment'
import { formaterFilstørrelse } from '../../../utils/fil-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'
import Fil from '../fil/fil'
import binders from './binders.svg'

const DragAndDrop = () => {
    const { setUopplastetFil, lasteFeil, setLasteFeil } = useAppStore()
    const [ filer ] = useState<File[]>([])

    const tillatteFiltyper = env.tillatteFiltyper
    const maxFilstørrelse = env.maksFilstørrelse

    const onDropCallback = useCallback(
        (filer) => {
            filer.forEach((fil: File) => {
                setUopplastetFil(fil)

                if (maxFilstørrelse && fil.size > maxFilstørrelse) {
                    const maks = formaterFilstørrelse(maxFilstørrelse)
                    lasteFeil.push(
                        getLedetekst(tekst('drag_and_drop.maks'), {
                            '%FILNAVN%': fil.name,
                            '%MAKSSTOR%': maks
                        })
                    )
                }

                if (tillatteFiltyper && !tillatteFiltyper.includes(fil.type)) {
                    lasteFeil.push(
                        getLedetekst(tekst('drag_and_drop.filtype'), {
                            '%FILNAVN%': fil.name,
                            '%TILLATTEFILTYPER%': tillatteFiltyper
                        })
                    )
                }
                setLasteFeil(lasteFeil)
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
            <img src={binders} className="opplastingsikon" alt="Opplastingsikon" />
            <Normaltekst tag="span" className="tekst">
                {isDragActive
                    ? tekst('drag_and_drop.dragtekst.aktiv')
                    : tekst('drag_and_drop.dragtekst')
                }
            </Normaltekst>

            {filer.map((fil, idx) => {
                return <Fil fil={fil} key={idx} />
            })}

        </div>
    )
}

export default DragAndDrop
