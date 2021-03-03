import dayjs from 'dayjs'
import { Datepicker } from 'nav-datovelger'
import { Knapp } from 'nav-frontend-knapper'
import NavFrontendSpinner from 'nav-frontend-spinner'
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'

import { post } from '../../../data/fetcher/fetcher'
import { useAppStore } from '../../../data/stores/app-store'
import { Sporsmal, UtgiftTyper } from '../../../types/types'
import env from '../../../utils/environment'
import { formaterFilstørrelse } from '../../../utils/fil-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'
import Vis from '../../diverse/vis'
import DragAndDrop from '../drag-and-drop/drag-and-drop'
import validerDato from '../../../utils/validering'
import { skalBrukeFullskjermKalender } from '../../../utils/browser-utils'
import Alertstripe  from 'nav-frontend-alertstriper'
import { RSKvittering } from '../../../types/rs-types/rs-kvittering'
import { RSSvar } from '../../../types/rs-types/rs-svar'
import { SpmProps } from '../../sporsmal/sporsmal-form/sporsmal-form'
import { RSSporsmal } from '../../../types/rs-types/rs-sporsmal'
import { useParams } from 'react-router-dom'
import { RouteParams } from '../../../app'

const formaterteFiltyper = env.formaterteFiltyper
const maksFilstorrelse = formaterFilstørrelse(env.maksFilstørrelse)

interface OpplastetKvittering {
    id: string;
}

const KvitteringForm = ({ sporsmal }: SpmProps) => {
    const {
        valgtReisetilskudd, setValgtReisetilskudd, valgtKvittering, setOpenModal, valgtFil
    } = useAppStore()
    const [ laster, setLaster ] = useState<boolean>(false)
    const [ dato, setDato ] = useState<string>('')
    const [ typeUtgift, setTypeUtgift ] = useState<string>('')
    const [ fetchFeilmelding, setFetchFeilmelding ] = useState<string | null>(null)
    const { steg } = useParams<RouteParams>()
    const stegNum = Number(steg)
    const spmIndex = stegNum - 1

    const methods = useForm({
        reValidateMode: 'onSubmit'
    })

    useEffect(() => {
        if (valgtKvittering) {
            setDato(dayjs(valgtKvittering?.datoForUtgift).format('YYYY-MM-DD'))
        }
        else {
            setDato('')
        }
        // eslint-disable-next-line
    }, [ valgtReisetilskudd, valgtKvittering ])

    const onSubmit = async() => {
        setLaster(true)

        const valid = await methods.trigger()

        if (!valid) {
            setLaster(false)
            return
        }

        const requestData = new FormData()
        const blob = await valgtFil as Blob
        requestData.append('file', blob)

        post<OpplastetKvittering>(`${env.flexGatewayRoot}/flex-bucket-uploader/opplasting`, undefined, {
            method: 'POST',
            body: requestData,
            credentials: 'include'
        }).then((opplastingResponse) => {
            const svar = {
                kvittering: {
                    blobId: opplastingResponse.parsedBody!.id,
                    datoForUtgift: dato,
                    belop: methods.getValues('belop_input') * 100,
                    typeUtgift: methods.getValues('transportmiddel')
                } as RSKvittering
            } as RSSvar
            post<RSSporsmal>(`${env.flexGatewayRoot}/flex-reisetilskudd-backend/api/v1/reisetilskudd/${valgtReisetilskudd!.id}/sporsmal/${sporsmal!.id}/svar`,
                svar
            ).then((rsSporsmal) => {
                valgtReisetilskudd!.sporsmal[spmIndex] = new Sporsmal(rsSporsmal.parsedBody!, null, true)
                setValgtReisetilskudd(valgtReisetilskudd)
                setOpenModal(false)
            }).catch(() => {
                setFetchFeilmelding('Det skjedde en feil i baksystemene, prøv igjen senere')
            })
        }).catch((ex) => {
            if (ex.name === 'FetchError') {
                if (ex.status === 413) {
                    setFetchFeilmelding('Filen du prøvde å laste opp er for stor')
                } else {
                    setFetchFeilmelding('Det skjedde en feil i baksystemene, prøv igjen senere')
                }
            } else {
                setFetchFeilmelding('Det skjedde en feil i baksystemene, prøv igjen senere')
            }
        }).finally(() => {
            setLaster(false)
        })
    }

    const typeUtgiftOnChange = (e: any) => {
        setTypeUtgift(e.target.value)
        methods.trigger('transportmiddel')
    }

    if (!valgtReisetilskudd) return null

    return (
        <FormProvider {...methods}>
            <form key="kvittering_form">
                <Systemtittel className="kvittering-header">
                    {tekst('kvittering_modal.nytt-utlegg.tittel')}
                </Systemtittel>

                <div className="skjemakolonner">
                    <div className="skjemaelement">
                        <label htmlFor="transportmiddel" className="skjemaelement__label">
                            {tekst('kvittering_modal.type-utgift.label')}
                        </label>
                        <select
                            ref={methods.register({ required: tekst('kvittering_modal.transportmiddel.feilmelding') })}
                            className={
                                'skjemaelement__input input--fullbredde kvittering-element' +
                                (methods.errors['transportmiddel'] ? ' skjemaelement__input--harFeil' : '')
                            }
                            id="transportmiddel"
                            name="transportmiddel"
                            onChange={typeUtgiftOnChange}
                            defaultValue={valgtKvittering?.typeUtgift}
                        >
                            <option value="">Velg</option>
                            {Object.entries(UtgiftTyper).map((keyval, idx) => {
                                return (
                                    <option value={keyval[0]} id={keyval[0]} key={idx}>
                                        {keyval[1]}
                                    </option>
                                )
                            })}
                        </select>

                        <Normaltekst tag="div" role="alert" aria-live="assertive"
                            className="skjemaelement__feilmelding">
                            <Vis hvis={methods.errors['transportmiddel']}>
                                <p>{tekst('kvittering_modal.transportmiddel.feilmelding')}</p>
                            </Vis>
                        </Normaltekst>
                    </div>

                    <div className="skjemaelement">
                        <label htmlFor="dato_input" className="skjemaelement__label">
                            <Element tag="strong">{tekst('kvittering_modal.dato')}</Element>
                        </label>
                        <Controller
                            control={methods.control}
                            name="dato_input"
                            defaultValue={valgtKvittering?.datoForUtgift || ''}
                            rules={{
                                validate: () => {
                                    const div: HTMLDivElement | null = document.querySelector('.nav-datovelger__input')
                                    const validert = validerDato(
                                        methods.getValues(),
                                        valgtReisetilskudd?.fom,
                                        valgtReisetilskudd?.tom
                                    )
                                    if (validert !== true) {
                                        div?.classList.add('skjemaelement__input--harFeil')
                                        return validert
                                    }

                                    div?.classList.remove('skjemaelement__input--harFeil')
                                    return validert
                                }
                            }}
                            render={({ name }) => (
                                <Datepicker
                                    locale={'nb'}
                                    inputId="dato_input"
                                    onChange={(value) => {
                                        methods.setValue(name, value)
                                        setDato(value)
                                    }}
                                    value={dato}
                                    inputProps={{
                                        name: name,
                                    }}
                                    calendarSettings={{
                                        showWeekNumbers: true,
                                        position: skalBrukeFullskjermKalender()
                                    }}
                                    showYearSelector={false}
                                    limitations={{
                                        weekendsNotSelectable: false,
                                        minDate: valgtReisetilskudd?.fom.toISOString() || undefined,
                                        maxDate: valgtReisetilskudd?.tom.toISOString() || undefined
                                    }}
                                    dayPickerProps={{
                                        initialMonth: valgtReisetilskudd?.fom
                                    }}
                                />
                            )}
                        />

                        <Normaltekst tag="div" role="alert" aria-live="assertive"
                            className="skjemaelement__feilmelding">
                            <Vis hvis={methods.errors['dato_input']}>
                                <p>{methods.errors['dato_input']?.message}</p>
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
                                min: { value: 0, message: 'Beløp kan ikke være negativt' },
                                max: { value: 10000, message: 'Beløp kan ikke være større enn 10 000' },
                                validate: (val) => {
                                    const belop = val.split('.')
                                    if (belop[1]?.length > 2) {
                                        methods.setValue('belop_input', belop[0] + '.' + belop[1].substring(0, 2))
                                    }
                                    return true
                                }
                            })}
                            type="number"
                            id="belop_input"
                            name="belop_input"
                            inputMode={'decimal'}
                            defaultValue={valgtKvittering?.belop ? (valgtKvittering.belop / 100) : ''}
                            className={
                                'skjemaelement__input input--xs periode-element' +
                                (methods.errors['belop_input'] ? ' skjemaelement__input--harFeil' : '')
                            }
                            step={0.01}
                            autoComplete="off"
                        />
                        <span className="enhet">kr</span>
                        <Normaltekst tag="div" role="alert" aria-live="assertive"
                            className="skjemaelement__feilmelding">
                            <Vis hvis={methods.errors['belop_input']}>
                                <p>{methods.errors['belop_input']?.message}</p>
                            </Vis>
                        </Normaltekst>
                    </div>
                </div>

                <Vis hvis={typeUtgift === 'OFFENTLIG_TRANSPORT'}>
                    <Alertstripe type="info" form="inline">
                        <Normaltekst>{tekst('kvittering_modal.type-utgift.hjelpetekst')}</Normaltekst>
                    </Alertstripe>
                </Vis>

                <DragAndDrop />

                <Vis hvis={fetchFeilmelding}>
                    <Alertstripe type="advarsel">
                        <Normaltekst>{fetchFeilmelding}</Normaltekst>
                    </Alertstripe>
                </Vis>

                <Normaltekst className="restriksjoner">
                    <span className="filtype">{
                        getLedetekst(tekst('kvittering_modal.filtyper'), {
                            '%FILTYPER%': formaterteFiltyper
                        })
                    }</span>
                    <span className="filstr">{
                        getLedetekst(tekst('kvittering_modal.maksfilstr'), {
                            '%MAKSFILSTR%': maksFilstorrelse
                        })
                    }</span>
                </Normaltekst>

                {laster
                    ?
                    <NavFrontendSpinner className="lagre-kvittering" />
                    :
                    <div className="knapperad">
                        <Knapp htmlType="button" className="lagre-kvittering" onClick={() => setOpenModal(false)}>
                            {tekst('kvittering_modal.tilbake')}
                        </Knapp>
                        <Knapp type="hoved" htmlType="button" className="lagre-kvittering" onClick={() => onSubmit()}>
                            {tekst('kvittering_modal.bekreft')}
                        </Knapp>
                    </div>
                }
            </form>
        </FormProvider>
    )
}

export default KvitteringForm
