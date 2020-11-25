import './drag-and-drop.less'

import { Normaltekst } from 'nav-frontend-typografi'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'

import { useAppStore } from '../../../data/stores/app-store'
import env from '../../../utils/environment'
import { formaterFilstørrelse } from '../../../utils/fil-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'
import Vis from '../../diverse/vis'
import Fil from '../fil/fil'
import binders from './binders.svg'

const tillatteFiltyper = env.tillatteFiltyper
const maxFilstørrelse = env.maksFilstørrelse
const maks = formaterFilstørrelse(maxFilstørrelse)

const DragAndDrop = () => {
    const { uopplastetFil, setUopplastetFil } = useAppStore()
    const { setError, errors, register } = useFormContext()

    const onDropCallback = useCallback(
        (filer) => {
            filer.forEach((fil: File) => {
                if (maxFilstørrelse && fil.size > maxFilstørrelse) {
                    setError('maks_fil', {
                        type: 'skjema-feil',
                        message: getLedetekst(tekst('drag_and_drop.maks'),
                            { '%FILNAVN%': fil.name, '%MAKSSTOR%': maks }
                        )
                    })
                }

                if (tillatteFiltyper && !tillatteFiltyper.includes(fil.type)) {
                    setError('tillatt_fil', {
                        type: 'skjema-feil',
                        message: getLedetekst(tekst('drag_and_drop.filtype'),
                            { '%FILNAVN%': fil.name, '%TILLATTEFILTYPER%': tillatteFiltyper }
                        )
                    })
                }

                if (!errors.valgt_fil) {
                    setUopplastetFil(fil)
                }
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
        <>
            <Vis hvis={!uopplastetFil}>
                <div className="filopplasteren" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <input type="hidden" name="fil_input" id="fil_input"
                        defaultValue={uopplastetFil && uopplastetFil!.name ? uopplastetFil!.name : ''}
                        ref={register({ required: tekst('filopplaster_modal.filopplasting.feilmelding') })}
                    />
                    <img src={binders} className="opplastingsikon" alt="Opplastingsikon" />
                    <Normaltekst tag="span" className="tekst">
                        {isDragActive
                            ? tekst('drag_and_drop.dragtekst.aktiv')
                            : tekst('drag_and_drop.dragtekst')
                        }
                    </Normaltekst>
                </div>

                <Normaltekst tag="div" role="alert" aria-live="assertive" className="skjemaelement__feilmelding">
                    <Vis hvis={errors.fil_input}>
                        <p>{tekst('filopplaster_modal.filopplasting.feilmelding')}</p>
                    </Vis>
                </Normaltekst>

            </Vis>

            {uopplastetFil && uopplastetFil!.name
                ? <>
                    <Fil fil={uopplastetFil} />

                    <Normaltekst tag="div" role="alert" aria-live="assertive" className="skjemaelement__feilmelding">
                        <Vis hvis={errors['maks_fil']}>
                            <p>{getLedetekst(tekst('drag_and_drop.maks'),
                                { '%FILNAVN%': uopplastetFil!.name, '%MAKSSTOR%': maks }
                            )}</p>
                        </Vis>
                        <Vis hvis={errors['tillatt_fil']}>
                            <p>{getLedetekst(tekst('drag_and_drop.filtype'),
                                { '%FILNAVN%': uopplastetFil!.name, '%TILLATTEFILTYPER%': tillatteFiltyper }
                            )}</p>
                        </Vis>
                    </Normaltekst>
                </>
                : null
            }
        </>
    )
}

export default DragAndDrop
