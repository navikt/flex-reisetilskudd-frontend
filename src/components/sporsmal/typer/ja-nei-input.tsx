import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import AnimateOnMount from '../animate-on-mount'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import Vis from '../../diverse/vis'
import { hentFeilmelding, sporsmalIdListe } from '../sporsmal-utils'
import { hentFormState, hentSvar } from '../hent-svar'
import { useAppStore } from '../../../data/stores/app-store'

const jaNeiValg = [ {
    value: 'JA',
    label: 'Ja',
}, {
    value: 'NEI',
    label: 'Nei',
} ]

const JaNeiInput = ({ sporsmal }: SpmProps) => {
    const { setErBekreftet } = useAppStore()
    const { register, setValue, errors, reset, getValues, clearErrors } = useFormContext()
    const feilmelding = hentFeilmelding(sporsmal)
    const [ lokal, setLokal ] = useState<string>(hentSvar(sporsmal))

    useEffect(() => {
        setErBekreftet(false)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (sporsmal.erHovedsporsmal) {
            reset(hentFormState(sporsmal))
        } else {
            setValue(sporsmal.id, hentSvar(sporsmal))
        }
        // eslint-disable-next-line
    }, [ sporsmal.id ]);

    useEffect(() => {
        setLokal(hentSvar(sporsmal))
        // eslint-disable-next-line
    }, [ sporsmal ])

    const changeValue = (value: string) => {
        setValue(sporsmal.id, value)
        setLokal(value)
        setErBekreftet(value !== sporsmal.kriterieForVisningAvUndersporsmal)
    }

    const valider = (value: any) => {
        console.log('valider') // eslint-disable-line
        if (value === 'JA' || value === 'NEI') {
            if (sporsmal.erHovedsporsmal) {
                clearErrors()
            } else {
                clearErrors(sporsmalIdListe(sporsmal.undersporsmal))
            }
            return true
        }
        return false
    }

    return (
        <>
            <div className="inputPanelGruppe inputPanelGruppe--horisontal">
                <fieldset className={'skjema__fieldset' + (errors[sporsmal.id] ? ' skjemagruppe--feil' : '')}>
                    <legend className="skjema__legend">
                        <Undertittel tag="h3" className="skjema__sporsmal">
                            {sporsmal.overskrift}
                        </Undertittel>
                        <Element>{sporsmal.sporsmalstekst}</Element>
                    </legend>
                    <div className="inputPanelGruppe__inner">
                        {jaNeiValg.map((valg, idx) => {
                            const OK = getValues()[sporsmal.id] === valg.value
                            return (
                                <label className={'inputPanel radioPanel' + (OK ? ' inputPanel--checked' : '')}
                                    key={idx}>
                                    <input type="radio"
                                        name={sporsmal.id}
                                        id={sporsmal.id + '_' + idx}
                                        className="inputPanel__field"
                                        aria-checked={OK}
                                        defaultChecked={OK}
                                        value={valg.value}
                                        onClick={() => changeValue(valg.value)}
                                        ref={register({
                                            validate: (value) => valider(value),
                                            required: feilmelding.global
                                        })}
                                    />
                                    <span className="inputPanel__label">{valg.label}</span>
                                </label>
                            )
                        })}
                    </div>
                </fieldset>
            </div>

            <Normaltekst tag="div" role="alert" aria-live="assertive" className="skjemaelement__feilmelding">
                <Vis hvis={errors[sporsmal.id] !== undefined}>
                    <p>{feilmelding.lokal}</p>
                </Vis>
            </Normaltekst>

            <AnimateOnMount
                mounted={lokal === sporsmal.kriterieForVisningAvUndersporsmal}
                enter="undersporsmal--vis"
                leave="undersporsmal--skjul"
                start="undersporsmal"
            >
                <UndersporsmalListe oversporsmal={sporsmal} oversporsmalSvar={lokal} />
            </AnimateOnMount>
        </>
    )
}

export default JaNeiInput
