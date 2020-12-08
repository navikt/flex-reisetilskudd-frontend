import './drag-and-drop.less'

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React, { useCallback, useEffect, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'

import { useAppStore } from '../../../data/stores/app-store'
import env from '../../../utils/environment'
import { customTruncet, formaterFilstørrelse } from '../../../utils/fil-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'
import Vis from '../../diverse/vis'
import binders from './binders.svg'

const tillatteFiltyper = env.tillatteFiltyper
const maxFilstørrelse = env.maksFilstørrelse
const maks = formaterFilstørrelse(maxFilstørrelse)

const DragAndDrop = () => {
    const { valgtFil, setValgtFil } = useAppStore()
    const { setError, errors, register, setValue } = useFormContext()
    const filRef = useRef<HTMLInputElement>(null)

    const onDropCallback = useCallback(
        (filer) => {
            filer.forEach((fil: File) => {
                if (maxFilstørrelse && fil.size > maxFilstørrelse) {
                    setError('fil_input', {
                        type: 'skjema-feil',
                        message: getLedetekst(tekst('drag_and_drop.maks'),
                            { '%FILNAVN%': fil.name, '%MAKSSTOR%': maks }
                        )
                    })
                }

                if (tillatteFiltyper && !tillatteFiltyper.includes(fil.type)) {
                    setError('fil_input', {
                        type: 'skjema-feil',
                        message: getLedetekst(tekst('drag_and_drop.filtype'),
                            { '%FILNAVN%': fil.name, '%TILLATTEFILTYPER%': tillatteFiltyper }
                        )
                    })
                }

                if (!errors.fil_input) {
                    setValgtFil(fil)
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

    useEffect(() => {
        setValue('fil_input', filRef.current && filRef.current.value)
        // eslint-disable-next-line
    }, [ filRef, valgtFil ])

    return (
        <>
            <Vis hvis={!valgtFil}>
                <label htmlFor="ddfil" className="skjemaelement__label">
                    <Element tag="strong">{tekst('drag_and_drop.label')}</Element>
                </label>
                <div className="filopplasteren" {...getRootProps()}>
                    <input ref={filRef} {...getInputProps()} id="ddfil" />
                    <input type="hidden" name="fil_input" id="fil_input"
                        defaultValue={filRef.current && filRef.current.name as any}
                        ref={register({ required: tekst('kvittering_modal.filopplasting.feilmelding') })}
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
                        <p>{tekst('kvittering_modal.filopplasting.feilmelding')}</p>
                    </Vis>
                </Normaltekst>
            </Vis>

            <Vis hvis={valgtFil && valgtFil!.name}>
                <Ekspanderbartpanel tittel={
                    <Undertittel tag="span" className="filnavn">
                        {customTruncet('valgtFil!.name', 40)}
                    </Undertittel>
                }>
                    <div className="preview">
                        Bilde inn her
                    </div>
                </Ekspanderbartpanel>

                <Normaltekst tag="div" role="alert" aria-live="assertive" className="skjemaelement__feilmelding">
                    <Vis hvis={errors['maks_fil']}>
                        <p>{getLedetekst(tekst('drag_and_drop.maks'),
                            { '%FILNAVN%': 'valgtFil!.name', '%MAKSSTOR%': maks }
                        )}</p>
                    </Vis>
                    <Vis hvis={errors['tillatt_fil']}>
                        <p>{getLedetekst(tekst('drag_and_drop.filtype'),
                            { '%FILNAVN%': 'valgtFil!.name', '%TILLATTEFILTYPER%': tillatteFiltyper }
                        )}</p>
                    </Vis>
                </Normaltekst>
            </Vis>
        </>
    )
}

export default DragAndDrop
