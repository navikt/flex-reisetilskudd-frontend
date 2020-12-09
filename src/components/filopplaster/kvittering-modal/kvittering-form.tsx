import dayjs from 'dayjs'
import parser from 'html-react-parser'
import { Datepicker } from 'nav-datovelger'
import { Knapp } from 'nav-frontend-knapper'
import NavFrontendSpinner from 'nav-frontend-spinner'
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useEffect, useRef, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import useForceUpdate from 'use-force-update'

import { RouteParams } from '../../../app'
import { post } from '../../../data/fetcher/fetcher'
import { useAppStore } from '../../../data/stores/app-store'
import { Kvittering, OpplastetKvittering, Transportmiddel } from '../../../types'
import env from '../../../utils/environment'
import { formaterFilstørrelse } from '../../../utils/fil-utils'
import { logger } from '../../../utils/logger'
import { tekst } from '../../../utils/tekster'
import Vis from '../../diverse/vis'
import DragAndDrop from '../drag-and-drop/drag-and-drop'

const formaterteFiltyper = env.formaterteFiltyper
const maksFilstorrelse = formaterFilstørrelse(env.maksFilstørrelse)

const KvitteringForm = () => {
    const {
        valgtReisetilskudd, kvitteringIndex, setOpenModal
    } = useAppStore()
    const { id } = useParams<RouteParams>()
    const [ laster, setLaster ] = useState<boolean>(false)
    const [ kvittering, setKvittering ] = useState<Kvittering>()
    const [ dato, setDato ] = useState<string>('')
    const forceUpdate = useForceUpdate()
    const datoRef = useRef<HTMLInputElement>(null)

    const methods = useForm({
        reValidateMode: 'onSubmit'
    })

    const options = [
        { id: `${Transportmiddel.SPØRSMÅLS_KEY}-${Transportmiddel.TAXI}`, value: Transportmiddel.TAXI },
        { id: `${Transportmiddel.SPØRSMÅLS_KEY}-${Transportmiddel.EGEN_BIL}`, value: Transportmiddel.EGEN_BIL },
        { id: `${Transportmiddel.SPØRSMÅLS_KEY}-${Transportmiddel.KOLLEKTIVT}`, value: Transportmiddel.KOLLEKTIVT }
    ]

    useEffect(() => {
        if (kvitteringIndex === -1) {
            setKvittering({ reisetilskuddId: id })
        } else {
            const kvitto = valgtReisetilskudd!.kvitteringer[kvitteringIndex]
            setKvittering(kvitto)
            setDato(dayjs(kvitto!.fom).format('YYYY-MM-DD'))
            forceUpdate()
        }
        // datoInputFokus()
        // eslint-disable-next-line
    }, [])

    const lagreKvittering = (fil: File) => {
        // TODO: Legg kvittering inn i valgtReisetilskudd
        setLaster(true)
        methods.setValue('name', fil.name)
        methods.setValue('storrelse', fil.size)
        post<OpplastetKvittering>(`${env.mockBucketUrl}/kvittering`, methods.getValues())
            .then((response) => {
                if (response.parsedBody?.reisetilskuddId) {
                    return kvittering
                }
                logger.warn('Responsen inneholder ikke noen id', response.parsedBody)
                return null
            })
            .then((kvitt) => {
                post<Kvittering>(`${env.backendUrl}/api/v1/kvittering`, kvitt)
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
        lagreKvittering({} as any)  // TODO: Trenger ikke sende med noe, hentes fra form
    }

    if (!kvittering) return null

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Systemtittel className="kvittering-header">
                    {tekst('kvittering_modal.nytt-utlegg.tittel')} {kvittering?.fom}
                </Systemtittel>

                <div className="skjemaelement">
                    <label htmlFor="dato_input" className="skjemaelement__label">
                        <Element tag="strong">Dato</Element>
                    </label>
                    <Controller
                        control={methods.control}
                        name="dato_input"
                        defaultValue={kvittering?.fom || ''}
                        rules={{
                            validate: () => {
                                // TODO: Bedre validering
                                if (datoRef.current?.value === '') {
                                    datoRef.current.classList.add('skjemaelement__input--harFeil')
                                    return tekst('kvittering_modal.dato.feilmelding')
                                }
                                datoRef.current?.classList.remove('skjemaelement__input--harFeil')
                                return true
                            }
                        }}
                        render={({ name }) => (
                            <Datepicker
                                locale={'nb'}
                                inputId="dato_input"
                                onChange={setDato}
                                value={dato}
                                inputProps={{
                                    name: name,
                                    inputRef: datoRef   // TODO: Se på 'React does not recognize the `inputRef` prop on a DOM element.'
                                }}
                                calendarSettings={{ showWeekNumbers: true }}
                                showYearSelector={false}
                                limitations={{
                                    weekendsNotSelectable: false,
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
                    <label htmlFor="transportmiddel" className="skjemaelement__label">
                        Transportmiddel
                    </label>
                    <select
                        ref={methods.register({ required: tekst('kvittering_modal.transportmiddel.feilmelding') })}
                        key={Transportmiddel.SPØRSMÅLS_KEY}
                        className={
                            'skjemaelement__input kvittering-element' +
                            (methods.errors['transportmiddel'] ? ' skjemaelement__input--harFeil' : '')
                        }
                        id="transportmiddel"
                        name="transportmiddel"
                        onChange={() => methods.trigger('transportmiddel')}
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

                    <Normaltekst tag="div" role="alert" aria-live="assertive" className="skjemaelement__feilmelding">
                        <Vis hvis={methods.errors['transportmiddel']}>
                            <p>{tekst('kvittering_modal.transportmiddel.feilmelding')}</p>
                        </Vis>
                    </Normaltekst>
                </div>

                <div className="skjemaelement">
                    <label htmlFor="belop_input" className="skjemaelement__label">
                        <Element tag="strong">{tekst('kvittering_modal.tittel')}</Element>
                    </label>
                    <input
                        ref={methods.register({
                            required: tekst('kvittering_modal.belop.feilmelding'),
                            min: 0,
                            max: 10000
                        })}
                        type="number"
                        id="belop_input"
                        name="belop_input"
                        inputMode={'numeric'}
                        pattern="[0-9]*"
                        defaultValue={kvittering?.belop}
                        className={
                            'skjemaelement__input input--m periode-element' +
                            (methods.errors['belop_input'] ? ' skjemaelement__input--harFeil' : '')
                        }
                    />
                    <Normaltekst tag="div" role="alert" aria-live="assertive" className="skjemaelement__feilmelding">
                        <Vis hvis={methods.errors['belop_input']}>
                            <p>{tekst('kvittering_modal.belop.feilmelding')}</p>
                        </Vis>
                    </Normaltekst>
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
                        <Knapp htmlType="submit" className="lagre-kvittering">
                            {tekst('kvittering_modal.bekreft')}
                        </Knapp>
                    </div>
                }
            </form>
        </FormProvider>
    )
}

export default KvitteringForm
