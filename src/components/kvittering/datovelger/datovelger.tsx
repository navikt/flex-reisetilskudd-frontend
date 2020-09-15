import './flatpickr.less'
import './datovelger.less'

import { Norwegian } from 'flatpickr/dist/l10n/no'
import { SkjemaelementFeilmelding } from 'nav-frontend-skjema'
import { Element } from 'nav-frontend-typografi'
import React, { ReactNode } from 'react'
import Flatpickr from 'react-flatpickr'

import Vis from '../../vis'

interface Props {
    label?: ReactNode;
    className?: string;
    onChange?: (d: Date[]) => void;
    mode?: 'single' | 'multiple' | 'range' | 'time';
    id?: string;
    feil?: string;
    minDato?: string;
    maxDato?: string;
}

const Datovelger = ({ label, className, onChange, mode = 'single', id, feil, minDato, maxDato }: Props) => {
    const validerDato = (d: Date[]) => {
        if (onChange) {
            onChange(d)
        }
    }

    return (
        <div className={`datovelger-wrapper ${className} ${feil ? 'datovelger-med-feil' : ''}`}>
            <Element className="label">{label}</Element>
            <Flatpickr
                className="skjemaelement__input input--m"
                placeholder={(mode === 'range') ? 'dd.mm.åååå til dd.mm.åååå' : 'dd.mm.åååå'}
                options={{
                    mode,
                    enableTime: false,
                    dateFormat: 'Y-m-d',
                    altInput: true,
                    altFormat: 'd.m.Y',
                    locale: Norwegian,
                    allowInput: true,
                    disableMobile: true,
                    minDate: minDato,
                    maxDate: maxDato,
                }}
                onChange={(date) => validerDato(date)}
                id={id}
            />
            <Vis hvis={feil !== undefined}>
                <SkjemaelementFeilmelding>
                    {feil}
                </SkjemaelementFeilmelding>
            </Vis>
        </div>
    )
}

export default Datovelger
