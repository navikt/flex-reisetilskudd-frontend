import './flatpickr.less'

import { Norwegian } from 'flatpickr/dist/l10n/no'
import parser from 'html-react-parser'
import { Knapp } from 'nav-frontend-knapper'
import NavFrontendSpinner from 'nav-frontend-spinner'
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import Flatpickr from 'react-flatpickr'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import { post } from '../../../data/fetcher/fetcher'
import { useAppStore } from '../../../data/stores/app-store'
import { Kvittering, OpplastetKvittering } from '../../../types'
import env from '../../../utils/environment'
import { formaterFilstørrelse } from '../../../utils/fil-utils'
import { logger } from '../../../utils/logger'
import { senesteTom, tidligsteFom } from '../../../utils/periode-utils'
import { tekst } from '../../../utils/tekster'
import Vis from '../../diverse/vis'
import TransportKvittering from '../../kvittering/transport-kvittering'
import DragAndDrop from '../drag-and-drop/drag-and-drop'

const formaterteFiltyper = env.formaterteFiltyper
const maksFilstorrelse = formaterFilstørrelse(env.maksFilstørrelse)

const KvitteringForm = () => {
    const { valgtReisetilskudd, kvitteringIndex, valgtSykmelding, setOpenModal, valgtFil } = useAppStore()
    const { id } = useParams<RouteParams>()
    const [ kvittering, setKvittering ] = useState<Kvittering>({ reisetilskuddId: id })
    const [ laster, setLaster ] = useState<boolean>(false)
    const methods = useForm({ reValidateMode: 'onSubmit' })

    useEffect(() => {
        console.log('kvitteringIndex', kvitteringIndex) // eslint-disable-line
        if (kvitteringIndex === 0) {
            console.log('aha!') // eslint-disable-line
            setKvittering({ reisetilskuddId: id })
        } else {
            console.log('snu!') // eslint-disable-line
            setKvittering(valgtReisetilskudd!.kvitteringer[kvitteringIndex])
        }
        console.log('kvittering', kvittering) // eslint-disable-line
        datoInputFokus()
        // eslint-disable-next-line
    }, [])

    const lagreKvittering = (fil: File) => {
        const requestData = new FormData()
        requestData.append('file', fil)
        requestData.append('dato', methods.getValues('dato_input'))
        requestData.append('beløp', methods.getValues('belop_input'))
        setLaster(true)

        post<OpplastetKvittering>(`${env.mockBucketUrl}/kvittering`, requestData)
            .then((response) => {
                if (response.parsedBody?.reisetilskuddId) {
                    const kvitt: Kvittering = {
                        reisetilskuddId: id,
                        navn: fil.name,
                        storrelse: fil.size,
                        belop: methods.getValues('belop_input'),
                        fom: (methods.getValues('dato_input') || new Date()),
                        kvitteringId: response.parsedBody!.reisetilskuddId,
                        transportmiddel: methods.getValues('transportmiddel')
                    }
                    return kvitt
                }
                logger.warn('Responsen inneholder ikke noen id', response.parsedBody)
                return null
            })
            .then((kvitt) => {
                post<Kvittering>(`${env.apiUrl}/api/v1/kvittering`, kvitt)
                    .then(() => {
                        setLaster(false)
                    })
                    .catch((error) => {
                        logger.error('Feil under opplasting av kvittering', error)
                    })
            })
            .catch((error) => {
                logger.error('Feil under opplasting av kvittering', error)
            })
    }

    const onSubmit = async() => {
        lagreKvittering({} as any)
    }

    const datoInputFokus = () => {
        setTimeout(() => {
            const selektor = 'input[type=text].dato_input'
            const input: HTMLInputElement | null = document.querySelector(selektor)
            input!.click()
        }, 1)
    }

    const valider = () => {
        validerDato()
        validerFil()
    }

    const lagre = () => {
        valider()
        datoInputFokus()
    }

    const validerDato = () => {
        const selektor = 'input[type=text].dato_input'
        const input: HTMLInputElement | null = document.querySelector(selektor)
        console.log('kvittering', kvittering) // eslint-disable-line
        if (input!.value === '') {
            input!.classList.add('skjemaelement__input--harFeil')
        } else {
            methods.setValue('dato_input', input!.value)
            methods.clearErrors('dato_input') // eslint-disable-line.log('dato_input', dato_input); //tslint:disable-line
            input!.classList.remove('skjemaelement__input--harFeil')
            kvittering!.fom = new Date(input!.value)
        }
    }

    const validerFil = () => {
        const selektor = '.filopplasteren'
        const div: HTMLDivElement | null = document.querySelector(selektor)
        if (!valgtFil) {
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
                    {tekst('kvittering_modal.nytt-utlegg.tittel')}
                </Systemtittel>
                <div className="cols">
                    <div className="col">
                        <div className="skjemaelement">
                            <label onClick={datoInputFokus} className="skjemaelement__label">
                                <Element tag="strong">Dato</Element>
                            </label>
                            <Controller
                                control={methods.control}
                                rules={{ required: tekst('kvittering_modal.dato.feilmelding') }}
                                id="dato_input"
                                name="dato_input"
                                placeholder="dd.mm.åååå"
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
                                    <p>{tekst('kvittering_modal.dato.feilmelding')}</p>
                                </Vis>
                            </Normaltekst>
                        </div>

                        <div className="skjemaelement">
                            <label htmlFor="belop_input" className="skjemaelement__label">
                                <Element tag="strong">{tekst('kvittering_modal.tittel')}</Element>
                            </label>
                            <input
                                ref={methods.register({ required: tekst('kvittering_modal.belop.feilmelding') })}
                                type="number"
                                id="belop_input"
                                name="belop_input"
                                inputMode={'numeric'}
                                pattern="[0-9]*"
                                className={
                                    'skjemaelement__input input--m periode-element' +
                                    (methods.errors['belop_input'] ? ' skjemaelement__input--harFeil' : '')
                                }
                                onChange={() => {
                                    methods.trigger('belop_input')
                                    kvittering!.belop = methods.getValues('belop_input')
                                }}
                            />
                            <Normaltekst tag="div" role="alert" aria-live="assertive" className="skjemaelement__feilmelding">
                                <Vis hvis={methods.errors['belop_input']}>
                                    <p>{tekst('kvittering_modal.belop.feilmelding')}</p>
                                </Vis>
                            </Normaltekst>
                        </div>
                    </div>
                    <div className="col">
                        <TransportKvittering />
                    </div>
                </div>

                <DragAndDrop />

                <Normaltekst className="restriksjoner">
                    <span className="filtype">
                        {parser(`Tillatte filtyper er <strong>${formaterteFiltyper}</strong>.`)}
                    </span>
                    <span className="filstr">
                        {parser(`Maks bildestørrelse er <strong>${maksFilstorrelse}</strong>.`)}
                    </span>
                </Normaltekst>

                {laster
                    ?
                    <NavFrontendSpinner className="lagre-kvittering" />
                    :
                    <div className="knapperad">
                        <Knapp htmlType="button" className="lagre-kvittering" onClick={() => setOpenModal(false)}>
                            {tekst('kvittering_modal.tilbake')}
                        </Knapp>
                        <Knapp htmlType="submit" className="lagre-kvittering" onClick={lagre}>
                            {tekst('kvittering_modal.bekreft')}
                        </Knapp>
                    </div>
                }
            </form>
        </FormProvider>
    )
}

export default KvitteringForm
