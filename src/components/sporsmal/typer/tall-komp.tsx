import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { hentFeilmelding } from '../sporsmal-utils'
import { hentSvar } from '../hent-svar'
import Vis from '../../diverse/vis'
import { useAppStore } from '../../../data/stores/app-store'
import { Svartype } from '../../../types/types'

const TallInput = ({ sporsmal }: SpmProps) => {
    const { setErBekreftet } = useAppStore()
    const feilmelding = hentFeilmelding(sporsmal)
    const [ lokal, setLokal ] = useState<string>(hentSvar(sporsmal))
    const { register, setValue, errors } = useFormContext()
    const undersporsmal = useRef<HTMLDivElement>(null)

    const onChange = (e: any) => {
        const value = e.target.value
        setValue(sporsmal.id, value)
        setLokal(value)
        setErBekreftet(value > 0)
    }

    useEffect(() => {
        const value = hentSvar(sporsmal)
        setValue(sporsmal.id, value)
        return () => {
            setErBekreftet(value > 0)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Vis hvis={sporsmal.sporsmalstekst}>
                <Element tag="h3" className="skjema__sporsmal">{sporsmal.sporsmalstekst}</Element>
            </Vis>

            <div className="medEnhet">
                <input type="number"
                    className="skjemaelement__input input--xs"
                    name={sporsmal.id}
                    id={sporsmal.id}
                    min={sporsmal.min!}
                    max={sporsmal.max!}
                    ref={register({
                        required: feilmelding.global,
                        min: {
                            value: sporsmal.min!,
                            message: getLedetekst(tekst('soknad.feilmelding.TALL_MIN_MAX'),
                                { '%MIN%': sporsmal.min, '%MAX%': sporsmal.max })
                        },
                        max: {
                            value: sporsmal.max!,
                            message: getLedetekst(tekst('soknad.feilmelding.TALL_MIN_MAX'),
                                { '%MIN%': sporsmal.min, '%MAX%': sporsmal.max }
                            )
                        }
                    })}
                    step={sporsmal.svartype === Svartype.BELOP ? 1 :
                        sporsmal.svartype === Svartype.KILOMETER ? 0.1 : 1
                    }
                    onChange={onChange}
                    autoComplete="off"
                />
                <label className="medEnhet__enhet" htmlFor={sporsmal.id}>{sporsmal.undertekst}</label>
            </div>

            <div role="alert" aria-live="assertive" className="skjemaelement__feilmelding">
                <Vis hvis={errors[sporsmal.id]}>
                    <Vis hvis={errors[sporsmal.id]?.type !== 'validate'}>
                        <Normaltekst tag="span">
                            <p>{feilmelding.lokal}</p>
                        </Normaltekst>
                    </Vis>
                </Vis>
            </div>

            <div className="undersporsmal" ref={undersporsmal}>
                <Vis hvis={lokal}>
                    <UndersporsmalListe oversporsmal={sporsmal} />
                </Vis>
            </div>
        </>
    )
}

export default TallInput
