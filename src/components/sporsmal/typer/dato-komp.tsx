import { Datepicker } from 'nav-datovelger'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { skalBrukeFullskjermKalender } from '../../../utils/browser-utils'
import { fraBackendTilDate } from '../../../utils/dato'
import validerDato from '../../../utils/valider-dato'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { hentFeilmelding } from '../sporsmal-utils'
import { hentSvar } from '../hent-svar'
import Vis from '../../diverse/vis'
import { useAppStore } from '../../../data/stores/app-store'

const DatoInput = ({ sporsmal }: SpmProps) => {
    const { setErBekreftet } = useAppStore()
    const { setValue, errors, watch, getValues } = useFormContext()
    const feilmelding = hentFeilmelding(sporsmal)
    const [ dato, setDato ] = useState<string>('')

    useEffect(() => {
        setDato(hentSvar(sporsmal))
        // eslint-disable-next-line
    }, [ sporsmal ])

    useEffect(() => {
        const svar = hentSvar(sporsmal)
        setValue(sporsmal.id, svar)
        setDato(svar)
        // eslint-disable-next-line
    }, [ sporsmal ])

    return (
        <div className="dato-komp">
            <label className="skjema__sporsmal" htmlFor={sporsmal.id}>
                <Element>{sporsmal.sporsmalstekst}</Element>
            </label>
            <Controller
                name={sporsmal.id}
                defaultValue={hentSvar(sporsmal)}
                rules={{
                    validate: () => {
                        const div: HTMLDivElement | null = document.querySelector('.nav-datovelger__input')
                        const detteFeilet = validerDato(sporsmal, getValues())
                        if (detteFeilet !== true) {
                            div?.classList.add('skjemaelement__input--harFeil')
                            return detteFeilet
                        }

                        div?.classList.remove('skjemaelement__input--harFeil')
                        return true
                    }
                }}
                render={({ name }) => (
                    <Datepicker
                        locale={'nb'}
                        inputId={name}
                        onChange={(value) => {
                            setValue(sporsmal.id, value)
                            setDato(value)
                            setErBekreftet(value !== '')
                        }}
                        value={dato}
                        inputProps={{
                            name: name
                        }}
                        calendarSettings={{
                            showWeekNumbers: true,
                            position: skalBrukeFullskjermKalender()
                        }}
                        showYearSelector={false}
                        limitations={{
                            weekendsNotSelectable: false,
                            minDate: sporsmal.min || undefined,
                            maxDate: sporsmal.max || undefined
                        }}
                        dayPickerProps={{
                            initialMonth: fraBackendTilDate(sporsmal.max!)
                        }}
                    />
                )}
            />

            <Normaltekst tag="div" role="alert" aria-live="assertive" className="skjemaelement__feilmelding">
                <Vis hvis={errors[sporsmal.id]}>
                    <p>{feilmelding.lokal}</p>
                </Vis>
            </Normaltekst>

            <div className="undersporsmal">
                <Vis hvis={watch(sporsmal.id)}>
                    <UndersporsmalListe oversporsmal={sporsmal} />
                </Vis>
            </div>
        </div>
    )
}

export default DatoInput
