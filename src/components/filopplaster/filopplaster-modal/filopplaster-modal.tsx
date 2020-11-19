import './filopplaster-modal.less'

import dayjs from 'dayjs'
import { Knapp } from 'nav-frontend-knapper'
import Modal from 'nav-frontend-modal'
import { FeiloppsummeringFeil, Input, SkjemaGruppe, } from 'nav-frontend-skjema'
import NavFrontendSpinner from 'nav-frontend-spinner'
import { Element, Systemtittel } from 'nav-frontend-typografi'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import { post } from '../../../data/fetcher/fetcher'
import { useAppStore } from '../../../data/stores/app-store'
import { Kvittering, OpplastetKvittering, Transportmiddel, Transportmidler } from '../../../types'
import { DatoFormat, formatertDato, getIDag } from '../../../utils/dato'
import env from '../../../utils/environment'
import { logger } from '../../../utils/logger'
import { senesteTom, tidligsteFom } from '../../../utils/periode-utils'
import { validerKroner, validerOgReturnerKroner } from '../../../utils/skjemavalidering'
import { tekst } from '../../../utils/tekster'
import FeilListe from '../../diverse/feil-liste'
import Vis from '../../diverse/vis'
import Datovelger from '../../kvittering/datovelger/datovelger'
import TransportKvittering from '../../kvittering/transport-kvittering'
import Fil from '../fil/fil'

const FilopplasterModal = () => {
    const {
        kvitteringer, setKvitteringer,
        typeKvittering, setTypeKvittering,
        uopplastetFil, setUopplastetFil,
        openModal, setOpenModal,
        valgtSykmelding
    } = useAppStore()

    const { id } = useParams<RouteParams>()
    const [ laster, setLaster ] = useState<boolean>(false)
    const [ dato, setDato ] = useState<Date | null>(null)
    const [ beløp, setBeløp ] = useState<string>('')
    const [ validertFeil, setValidertFeil ] = useState<FeiloppsummeringFeil[]>([])
    const [ erValidert, setErValidert ] = useState<boolean>(false)
    const [ lasteFeil, setLasteFeil ] = useState<string[]>([])
    const methods = useForm({ reValidateMode: 'onSubmit' })

    Modal.setAppElement('#maincontent')

    const nyKvittering = (kvittering: Kvittering) => {
        setKvitteringer([ ...kvitteringer, kvittering ])
    }

    const clearState = () => {
        setLaster(false)
        setDato(null)
        setBeløp('')
        setTypeKvittering(undefined)
        setUopplastetFil(null)
        setErValidert(false)
        setValidertFeil([])
    }

    const lukkModal = () => {
        clearState()
        setOpenModal(false)
        setLasteFeil([])
    }

    const feilliste: FeiloppsummeringFeil[] = []

    lasteFeil.forEach(feil =>
        feilliste.push({
            skjemaelementId: '',
            feilmelding: feil
        })
    )

    const fåFeilmeldingTilInput = (hvilkenInput: string): string | undefined => validertFeil.find(
        (element) => element.skjemaelementId === hvilkenInput,
    )?.feilmelding

    const validerBeløp = (nyttBeløp: string | null): FeiloppsummeringFeil[] => {
        if (!nyttBeløp || !validerKroner(nyttBeløp)) {
            return [ {
                skjemaelementId: 'filopplaster-totalt-beløp-input',
                feilmelding: tekst('filopplaster_modal.belop.feilmelding'),
            } ]
        }
        return []
    }

    const validerDato = (nyDato: Date | null): FeiloppsummeringFeil[] => {
        if (!nyDato) {
            return [ {
                skjemaelementId: 'filopplaster-dato-input',
                feilmelding: tekst('filopplaster_modal.dato.feilmelding'),
            } ]
        }
        if (dayjs(formatertDato(nyDato, DatoFormat.FLATPICKR))
            .isAfter(getIDag(DatoFormat.FLATPICKR))) {
            return [ {
                skjemaelementId: 'filopplaster-dato-input',
                feilmelding: tekst('filopplaster_modal.dagensdato.feilmelding'),
            } ]
        }
        return []
    }

    const validerTransportmiddel = (nyttTransportmiddel: Transportmidler): FeiloppsummeringFeil[] => {
        if (nyttTransportmiddel === undefined) {
            return [ {
                skjemaelementId: Transportmiddel.SPØRSMÅLS_KEY + '-' + Transportmiddel.TAXI,
                feilmelding: tekst('filopplaster_modal.transportmiddel.feilmelding'),
            } ]
        }
        return []
    }

    const validerKvittering = (
        nyttBeløp: string | null = null,
        nyDato: Date | null = null,
        nyttTransportmiddel: Transportmidler | null = null,
    ) => {
        const datoFeil = validerDato(nyDato || dato)
        const beløpFeil = validerBeløp(nyttBeløp || beløp)
        const transportmiddelFeil = validerTransportmiddel(nyttTransportmiddel || typeKvittering)

        const nyeValideringsFeil = [ ...datoFeil, ...beløpFeil, ...transportmiddelFeil ]
        setValidertFeil(nyeValideringsFeil)
        setErValidert(true)
        return nyeValideringsFeil.length === 0
    }

    const lagreKvittering = (fil: File) => {
        const requestData = new FormData()
        requestData.append('file', fil)

        if (validerKvittering()) {
            requestData.append('dato', dato!.toString())
            requestData.append('beløp', beløp.toString())

            const parsedBeløp = validerOgReturnerKroner(beløp)
            if (parsedBeløp === null || Number.isNaN(parsedBeløp)) {
                logger.error('Bruker har fått til å validere et ugyldig beløp', beløp)
                return
            }

            setLaster(true)
            post<OpplastetKvittering>(`${env.mockBucketUrl}/kvittering`, requestData)
                .then((response) => {
                    if (response.parsedBody?.id) {
                        const kvittering: Kvittering = {
                            reisetilskuddId: id,
                            navn: fil.name,
                            storrelse: fil.size,
                            belop: parsedBeløp,
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
                            lukkModal()
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
    }

    const handleBeløpChange = (beløpString: string) => {
        setBeløp(beløpString)
        if (erValidert) {
            validerKvittering(beløpString, null, null)
        }
    }

    const oppdaterDato = (nyDato: Date): void => {
        setDato(nyDato)
        if (erValidert) {
            validerKvittering(null, nyDato, null)
        }
    }

    const handleTransportmiddelChange = (transportmiddel: Transportmidler) => {
        if (erValidert) {
            validerKvittering(null, null, transportmiddel)
        }
    }

    const onSubmit = (data: any) => {
        console.log('data', data) // eslint-disable-line
    }

    if (valgtSykmelding === undefined) return null

    return (
        <Modal
            isOpen={openModal}
            onRequestClose={() => lukkModal()}
            closeButton
            contentLabel="Modal"
            className="filopplaster-modal"
        >
            <div className="modal-content">
                <Vis hvis={lasteFeil.length > 0}>
                    <>
                        <Systemtittel className="kvittering-header"> Feil i filopplasting </Systemtittel>
                        <FeilListe tittel="" feil={feilliste} />
                    </>
                </Vis>
                <Vis hvis={lasteFeil.length === 0}>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)} className="transportmiddel">
                            <Systemtittel className="kvittering-header">Ny kvittering</Systemtittel>
                            <Datovelger
                                id={'filopplaster-dato-input'}
                                className="periode-element"
                                label="Dato"
                                mode="single"
                                onChange={(nyDato) => oppdaterDato(nyDato[0])}
                                feil={fåFeilmeldingTilInput('filopplaster-dato-input')}
                                minDato={tidligsteFom(valgtSykmelding.mulighetForArbeid.perioder)}
                                maxDato={senesteTom(valgtSykmelding.mulighetForArbeid.perioder)}
                            />
                            <Input
                                label={<Element className="belop-label">{tekst('filopplaster_model.tittel')}</Element>}
                                inputMode={'numeric'}
                                value={beløp}
                                pattern="[0-9]*"
                                bredde={'fullbredde'}
                                onChange={(e) => handleBeløpChange(e.target.value)}
                                id={'filopplaster-totalt-beløp-input'}
                                feil={fåFeilmeldingTilInput('filopplaster-totalt-beløp-input')}
                            />
                            <SkjemaGruppe feil={fåFeilmeldingTilInput(Transportmiddel.SPØRSMÅLS_KEY + '-' + Transportmiddel.TAXI)}>
                                <TransportKvittering handleChange={(
                                    transportmiddel,
                                ) => handleTransportmiddelChange(transportmiddel)}
                                />
                            </SkjemaGruppe>
                            <Fil fil={uopplastetFil} className="opplastede-filer" />
                            {laster
                                ?
                                <NavFrontendSpinner className="lagre-kvittering" />
                                :
                                <Knapp htmlType="submit"
                                    className="lagre-kvittering"
                                    onClick={() => (
                                        uopplastetFil
                                            ? lagreKvittering(uopplastetFil)
                                            : logger.info('Noen har prøvd å laste opp en tom fil')
                                    )}
                                >
                                    {tekst('filopplaster_modal.lagre')}
                                </Knapp>
                            }
                            <Vis hvis={validertFeil.length > 0}>
                                <FeilListe tittel={tekst('filopplaster_modal.feiloppsummering')} feil={validertFeil} />
                            </Vis>
                        </form>
                    </FormProvider>
                </Vis>
            </div>
        </Modal>
    )
}

export default FilopplasterModal
