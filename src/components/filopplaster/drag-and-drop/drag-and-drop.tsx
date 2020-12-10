import './drag-and-drop.less'

import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useCallback, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'

import { useAppStore } from '../../../data/stores/app-store'
import env from '../../../utils/environment'
import { customTruncet, formaterFilstørrelse } from '../../../utils/fil-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'
import Vis from '../../diverse/vis'
import Utvidbar from '../../utvidbar/utvidbar'
import binders from './binders.svg'

const tillatteFiltyper = env.tillatteFiltyper
const maxFilstørrelse = env.maksFilstørrelse
const maks = formaterFilstørrelse(maxFilstørrelse)

const DragAndDrop = () => {
    const { valgtFil, setValgtFil } = useAppStore()
    const { setError, errors, register } = useFormContext()
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

    // TODO: Fix Vis
    // TODO: Nå vises bilde brukeren har valgt, her burde kanskje ferdig prosessert bilde vises?
    return (
        <>
            <label htmlFor="ddfil" className="skjemaelement__label">
                <Element tag="strong">{tekst('drag_and_drop.label')}</Element>
            </label>

            {valgtFil ? <Vis hvis={valgtFil}>
                <Utvidbar
                    erApen={false}
                    tittel={customTruncet(valgtFil?.name || '', 20)}
                    type="intern"
                    fixedHeight={true}
                >
                    <div className="preview">
                        <img alt="" src={URL.createObjectURL(valgtFil)} />
                    </div>
                </Utvidbar>

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
            </Vis> : null}

            <div className="filopplasteren" {...getRootProps()}>
                <input ref={filRef} {...getInputProps()} id="ddfil" />
                <input type="hidden" name="fil_input" id="fil_input"
                    defaultValue={filRef.current && filRef.current.name as any}
                    ref={register({
                        validate: () => {
                            // TODO: Se om det finnes en bedre måte å sette .skjemaelement__input--harFeil
                            const div: HTMLDivElement | null = document.querySelector('.filopplasteren')
                            if (valgtFil === undefined || valgtFil === null) {
                                div?.classList.add('skjemaelement__input--harFeil')
                                return tekst('kvittering_modal.filopplasting.feilmelding')
                            }
                            div?.classList.remove('skjemaelement__input--harFeil')
                            return true
                        }
                    })}
                />
                <img src={binders} className="opplastingsikon" alt="Opplastingsikon" />
                <Normaltekst tag="span" className="tekst">
                    {isDragActive
                        ? tekst('drag_and_drop.dragtekst.aktiv')
                        : valgtFil
                            ? tekst('drag_and_drop.dragtekst.endre')
                            : tekst('drag_and_drop.dragtekst')
                    }
                </Normaltekst>
            </div>

            <Normaltekst tag="div" role="alert" aria-live="assertive" className="skjemaelement__feilmelding">
                <Vis hvis={errors.fil_input}>
                    <p>{tekst('kvittering_modal.filopplasting.feilmelding')}</p>
                </Vis>
            </Normaltekst>
        </>
    )
}

export default DragAndDrop
