import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useAppStore } from '../../../data/stores/app-store'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import { hentSvar } from '../hent-svar'
import Vis from '../../diverse/vis'
import parser from 'html-react-parser'

const CheckboxInput = ({ sporsmal }: SpmProps) => {
    const { setErBekreftet } = useAppStore()
    const { register, setValue, errors } = useFormContext()
    const bekreft = useRef<HTMLDivElement>(null)
    const [ classname, setClassname ] = useState<string>('bekreftCheckboksPanel')
    const feilmelding = hentFeilmelding(sporsmal)
    const [ lokal, setLokal ] = useState<boolean>(hentSvar(sporsmal))

    useEffect(() => {
        const svar = hentSvar(sporsmal)
        setLokal(svar)
        setErBekreftet(svar)
        setValue(sporsmal.id, svar)
        setClassname(getClassName(svar === 'CHECKED'))
        // eslint-disable-next-line
    }, [ sporsmal ])

    const handleChange = (evt: any) => {
        bekreft.current!.classList.toggle('bekreftCheckboksPanel--checked')
        setValue(sporsmal.id, evt.target.checked)
        setLokal(evt.target.checked)
        setClassname(getClassName(evt.target.checked))
        setErBekreftet(evt.target.checked)
    }

    const getClassName = (checked: boolean) => {
        const cls = 'bekreftCheckboksPanel'
        const err = errors[sporsmal.id] ? ' skjemaelement__input--harFeil' : ''
        const all = checked ? cls + ' ' + cls + '--checked' : cls
        return all + err
    }

    return (
        <>
            <div className={classname} ref={bekreft}>
                <Undertittel tag="h3">{sporsmal.overskrift}</Undertittel>
                <Normaltekst>{sporsmal.sporsmalstekst}</Normaltekst>
                <div className="skjemaelement skjemaelement--horisontal">
                    <input type="checkbox"
                        className="skjemaelement__input checkboks"
                        name={sporsmal.id}
                        id={sporsmal.id}
                        checked={lokal}
                        onChange={handleChange}
                        ref={register({ required: feilmelding.global })}
                    />
                    <label className="skjemaelement__label" htmlFor={sporsmal.id}>
                        {parser(sporsmal.undertekst!)}
                    </label>
                </div>
            </div>

            <Normaltekst tag="div" role="alert" aria-live="assertive" className="skjemaelement__feilmelding">
                <Vis hvis={errors[sporsmal.id] !== undefined}>
                    <p>{feilmelding.lokal}</p>
                </Vis>
            </Normaltekst>
        </>
    )
}

export default CheckboxInput
