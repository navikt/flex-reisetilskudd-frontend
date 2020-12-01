import './transport-kvittering.less'

import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Transportmiddel } from '../../types'
import { tekst } from '../../utils/tekster'
import Vis from '../diverse/vis'

const TransportKvittering = () => {
    const { register, errors, trigger } = useFormContext()

    const options = [
        { id: `${Transportmiddel.SPØRSMÅLS_KEY}-${Transportmiddel.TAXI}`, value: Transportmiddel.TAXI },
        { id: `${Transportmiddel.SPØRSMÅLS_KEY}-${Transportmiddel.EGEN_BIL}`, value: Transportmiddel.EGEN_BIL },
        { id: `${Transportmiddel.SPØRSMÅLS_KEY}-${Transportmiddel.KOLLEKTIVT}`, value: Transportmiddel.KOLLEKTIVT }
    ]

    return (
        <div className="skjemaelement transport-kvittering">
            <label htmlFor="transportmiddel" className="skjemaelement__label">
                Transportmiddel
            </label>
            <div className="selectContainer">
                <select
                    ref={register({ required: tekst('kvittering_modal.transportmiddel.feilmelding') })}
                    key={Transportmiddel.SPØRSMÅLS_KEY}
                    className={
                        'skjemaelement__input kvittering-element' +
                        (errors['transportmiddel'] ? ' skjemaelement__input--harFeil' : '')
                    }
                    id="transportmiddel"
                    name="transportmiddel"
                    onChange={() => trigger('transportmiddel')}
                >
                    <option value="">Velg</option>
                    {options.map((option, idx) => {
                        return (
                            <option value={option.value} id={option.id} key={idx}>
                                {option.value}
                            </option>
                        )
                    })}
                </select>
            </div>

            <Normaltekst tag="div" role="alert" aria-live="assertive" className="skjemaelement__feilmelding">
                <Vis hvis={errors['transportmiddel']}>
                    <p>{tekst('kvittering_modal.transportmiddel.feilmelding')}</p>
                </Vis>
            </Normaltekst>
        </div>
    )
}

export default TransportKvittering
