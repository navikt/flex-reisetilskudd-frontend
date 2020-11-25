import './flatpickr.less'

import { Norwegian } from 'flatpickr/dist/l10n/no'
import { Knapp } from 'nav-frontend-knapper'
import NavFrontendSpinner from 'nav-frontend-spinner'
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import { post } from '../../../data/fetcher/fetcher'
import { useAppStore } from '../../../data/stores/app-store'
import { Kvittering, OpplastetKvittering, Transportmiddel } from '../../../types'
import env from '../../../utils/environment'
import { logger } from '../../../utils/logger'
import { senesteTom, tidligsteFom } from '../../../utils/periode-utils'
import { tekst } from '../../../utils/tekster'
import Vis from '../../diverse/vis'
import TransportKvittering from '../../kvittering/transport-kvittering'
import FeilOppsummering from '../../sporsmal/feiloppsummering/feil-oppsummering'
import DragAndDrop from '../drag-and-drop/drag-and-drop'

const KvitteringForm = () => {
    const {
        valgtReisetilskudd, setValgtReisetilskudd, valgtSykmelding, setOpenModal,
        typeKvittering, setTypeKvittering, uopplastetFil
    } = useAppStore()

    const [ dato ] = useState<Date | null>()
    const [ beløp ] = useState<number>()
    const [ laster, setLaster ] = useState<boolean>(false)
    const methods = useForm({ reValidateMode: 'onSubmit' })
    const { id } = useParams<RouteParams>()

    const lagreKvittering = (fil: File) => {
        const requestData = new FormData()
        requestData.append('file', fil)
        requestData.append('dato', dato!.toString())
        requestData.append('beløp', beløp ? beløp.toString() : '')
        setLaster(true)

        post<OpplastetKvittering>(`${env.mockBucketUrl}/kvittering`, requestData)
            .then((response) => {
                if (response.parsedBody?.id) {
                    const kvittering: Kvittering = {
                        reisetilskuddId: id,
                        navn: fil.name,
                        storrelse: fil.size,
                        belop: beløp,
                        fom: (dato || new Date()),
                        kvitteringId: response.parsedBody!.id,
                        transportmiddel: Object.entries(Transportmiddel)
                            .find(([ , v ]) => v === typeKvittering)?.[0],
                    }
                    nyKvittering(kvittering)
                    return kvittering
                }
                logger.warn('Responsen inneholder ikke noen id', response.parsedBody)
                return null
            })
            .then((kvittering) => {
                post<Kvittering>(`${env.apiUrl}/api/v1/kvittering`, kvittering)
                    .then(() => {
                        setLaster(false)
                        setTypeKvittering(undefined)
                    })
                    .catch((error) => {
                        logger.error('Feil under opplasting av kvittering', error)
                    })
            })
            .catch((error) => {
                logger.error('Feil under opplasting av kvittering', error)
            })
    }

    const nyKvittering = (kvittering: Kvittering) => {
        valgtReisetilskudd!.kvitteringer = [ ...valgtReisetilskudd!.kvitteringer, kvittering ]
        setValgtReisetilskudd(valgtReisetilskudd)
    }

    const onSubmit = async() => {
        lagreKvittering({} as any)
    }

    const datoInputFokus = () => {
        const selektor = 'input[type=text].dato_input'
        const input: HTMLInputElement | null = document.querySelector(selektor)
        input!.click()
    }

    const valider = () => {
        validerDato()
        validerFil()
    }

    const validerDato = () => {
        const selektor = 'input[type=text].dato_input'
        const input: HTMLInputElement | null = document.querySelector(selektor)
        if (input!.value === '') {
            input!.classList.add('skjemaelement__input--harFeil')
        } else {
            methods.setValue('dato_input', input!.value)
            methods.clearErrors('dato_input') // eslint-disable-line.log('dato_input', dato_input); //tslint:disable-line
            input!.classList.remove('skjemaelement__input--harFeil')
        }
    }

    const validerFil = () => {
        const selektor = '.filopplasteren'
        const div: HTMLDivElement | null = document.querySelector(selektor)
        if (!uopplastetFil) {
            div!.classList.add('skjemaelement__input--harFeil')
        } else {
            methods.clearErrors('fil_input') // eslint-disable-line
            div!.classList.remove('skjemaelement__input--harFeil')
        }
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Systemtittel className="kvittering-header">
                    {tekst('filopplaster_modal.nytt-utlegg.tittel')}
                </Systemtittel>
                <div className="cols">
                    <div className="col">
                        <div className="skjemaelement">
                            <label onClick={datoInputFokus} className="skjemaelement__label">
                                <Element tag="strong">Dato</Element>
                            </label>
                            <Controller
                                control={methods.control}
                                rules={{ required: tekst('filopplaster_modal.dato.feilmelding') }}
                                id="dato_input"
                                name="dato_input"
                                placeholder="dd.mm.åååå"
                                defaultValue={null}
                                render={({ name }) => (
                                    <Flatpickr
                                        onChange={validerDato}
                                        name={name}
                                        className="skjemaelement__input input--m dato_input"
                                        options={{
                                            minDate: tidligsteFom(valgtSykmelding!.mulighetForArbeid.perioder),
                                            maxDate: senesteTom(valgtSykmelding!.mulighetForArbeid.perioder),
                                            mode: 'single',
                                            enableTime: false,
                                            dateFormat: 'Y-m-d',
                                            altInput: true,
                                            altFormat: 'd.m.Y',
                                            locale: Norwegian,
                                            allowInput: true,
                                            disableMobile: true,
                                        }}
                                    />
                                )}
                            />
                            <Normaltekst tag="div" role="alert" aria-live="assertive" className="skjemaelement__feilmelding">
                                <Vis hvis={methods.errors['dato_input']}>
                                    <p>{tekst('filopplaster_modal.dato.feilmelding')}</p>
                                </Vis>
                            </Normaltekst>
                        </div>

                        <div className="skjemaelement">
                            <label htmlFor="belop_input" className="skjemaelement__label">
                                <Element tag="strong">{tekst('filopplaster_modal.tittel')}</Element>
                            </label>
                            <input
                                ref={methods.register({ required: tekst('filopplaster_modal.belop.feilmelding') })}
                                type="number"
                                id="belop_input"
                                name="belop_input"
                                inputMode={'numeric'}
                                defaultValue={beløp}
                                pattern="[0-9]*"
                                className={
                                    'skjemaelement__input input--m periode-element' +
                                    (methods.errors['belop_input'] ? ' skjemaelement__input--harFeil' : '')
                                }
                                onChange={() => methods.trigger('belop_input')}
                            />
                            <Normaltekst tag="div" role="alert" aria-live="assertive" className="skjemaelement__feilmelding">
                                <Vis hvis={methods.errors['belop_input']}>
                                    <p>{tekst('filopplaster_modal.belop.feilmelding')}</p>
                                </Vis>
                            </Normaltekst>
                        </div>
                    </div>
                    <div className="col">
                        <TransportKvittering />
                    </div>
                </div>

                <DragAndDrop />

                {laster
                    ?
                    <NavFrontendSpinner className="lagre-kvittering" />
                    :
                    <div className="knapperad">
                        <Knapp htmlType="button" className="lagre-kvittering" onClick={() => setOpenModal(false)}>
                            {tekst('filopplaster_modal.tilbake')}
                        </Knapp>
                        <Knapp htmlType="submit" className="lagre-kvittering" onClick={valider}>
                            {tekst('filopplaster_modal.bekreft')}
                        </Knapp>
                    </div>
                }

                <FeilOppsummering errors={methods.errors} />
            </form>
        </FormProvider>
    )
}

export default KvitteringForm
