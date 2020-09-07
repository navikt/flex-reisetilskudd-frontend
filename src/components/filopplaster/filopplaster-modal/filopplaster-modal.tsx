import './filopplaster-modal.less'

import moment from 'moment'
import { Knapp } from 'nav-frontend-knapper'
import Modal from 'nav-frontend-modal'
import { Feiloppsummering, FeiloppsummeringFeil, Input, SkjemaGruppe, } from 'nav-frontend-skjema'
import NavFrontendSpinner from 'nav-frontend-spinner'
import { Element, Systemtittel } from 'nav-frontend-typografi'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import { post } from '../../../data/fetcher/fetcher'
import { useAppStore } from '../../../data/stores/app-store'
import {
    Kvittering, OpplastetKvittering, Transportmiddel,
    TransportmiddelAlternativer,
} from '../../../types/kvittering'
import { DatoFormat, formatertDato, getIDag } from '../../../utils/dato'
import env from '../../../utils/environment'
import { logger } from '../../../utils/logger'
import { validerKroner, validerOgReturnerKroner } from '../../../utils/skjemavalidering'
import { tekst } from '../../../utils/tekster'
import Datovelger from '../../kvittering/datovelger/datovelger'
import TransportmiddelKvittering from '../../kvittering/transportmiddel-kvittering'
import {
    kvitteringDatoSpørsmål,
    kvitteringTotaltBeløpSpørsmål,
    kvitteringTransportmiddelSpørsmål,
} from '../../sporsmal-svar/sporsmal-konstanter'
import Vis from '../../vis'
import Fil from '../fil/fil'

const FilopplasterModal = () => {
    const {
        kvitteringer, setKvitteringer,
        transportmiddelKvittering, setTransportmiddelKvittering,
        uopplastetFil, setUopplastetFil,
        åpenFilopplasterModal, setÅpenFilopplasterModal,
    } = useAppStore()

    const { reisetilskuddID } = useParams<RouteParams>()
    const [ laster, setLaster ] = useState<boolean>(false)
    const [ dato, setDato ] = useState<Date | null>(null)
    const [ beløp, setBeløp ] = useState<string>('')
    const [ valideringsFeil, setValideringsFeil ] = useState<FeiloppsummeringFeil[]>([])
    const [ harAlleredeBlittValidert, setHarAlleredeBlittValidert ] = useState<boolean>(false)

    Modal.setAppElement('#root')

    const nyKvittering = (kvittering: Kvittering) => {
        setKvitteringer([ ...kvitteringer, kvittering ])
    }

    const clearState = () => {
        setLaster(false)
        setDato(null)
        setBeløp('')
        setTransportmiddelKvittering(undefined)
        setUopplastetFil(null)
        setHarAlleredeBlittValidert(false)
        setValideringsFeil([])
    }

    const lukkModal = () => {
        clearState()
        setÅpenFilopplasterModal(false)
    }

    const fåFeilmeldingTilInput = (hvilkenInput: string): string | undefined => valideringsFeil.find(
        (element) => element.skjemaelementId === hvilkenInput,
    )?.feilmelding

    const validerBeløp = (nyttBeløp: string | null): FeiloppsummeringFeil[] => {
        if (!nyttBeløp || !validerKroner(nyttBeløp)) {
            return [ {
                skjemaelementId: kvitteringTotaltBeløpSpørsmål.id,
                feilmelding: tekst('filopplaster_modal.belop.feilmelding'),
            } ]
        }
        return []
    }

    const validerDato = (nyDato: Date | null): FeiloppsummeringFeil[] => {
        if (!nyDato) {
            return [ {
                skjemaelementId: kvitteringDatoSpørsmål.id,
                feilmelding: tekst('filopplaster_modal.dato.feilmelding'),
            } ]
        }
        if (moment(formatertDato(nyDato, DatoFormat.FLATPICKR))
            .isAfter(getIDag(DatoFormat.FLATPICKR))) {
            return [ {
                skjemaelementId: kvitteringDatoSpørsmål.id,
                feilmelding: tekst('filopplaster_modal.dagensdato.feilmelding'),
            } ]
        }
        return []
    }

    const validerTransportmiddel = (nyttTransportmiddel: TransportmiddelAlternativer): FeiloppsummeringFeil[] => {
        if (nyttTransportmiddel === undefined) {
            return [ {
                skjemaelementId: kvitteringTransportmiddelSpørsmål.id,
                feilmelding: tekst('filopplaster_modal.transportmiddel.feilmelding'),
            } ]
        }
        return []
    }

    const validerKvittering = (
        nyttBeløp: string | null = null,
        nyDato: Date | null = null,
        nyttTransportmiddel: TransportmiddelAlternativer | null = null,
    ) => {
        const datoFeil = validerDato(nyDato || dato)
        const beløpFeil = validerBeløp(nyttBeløp || beløp)
        const transportmiddelFeil = validerTransportmiddel(nyttTransportmiddel || transportmiddelKvittering)

        const nyeValideringsFeil = [ ...datoFeil, ...beløpFeil, ...transportmiddelFeil ]
        setValideringsFeil(nyeValideringsFeil)
        setHarAlleredeBlittValidert(true)
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
                            reisetilskuddId: reisetilskuddID,
                            navn: fil.name,
                            storrelse: fil.size,
                            belop: parsedBeløp,
                            fom: (dato || new Date()),
                            kvitteringId: response.parsedBody!.id,
                            transportmiddel: Object.entries(Transportmiddel)
                                .find(([ , v ]) => v === transportmiddelKvittering)?.[0],
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
                            setTransportmiddelKvittering(undefined)
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
        if (harAlleredeBlittValidert) {
            validerKvittering(beløpString, null, null)
        }
    }

    const oppdaterDato = (nyDato: Date): void => {
        setDato(nyDato)
        if (harAlleredeBlittValidert) {
            validerKvittering(null, nyDato, null)
        }
    }

    const handleTransportmiddelChange = (transportmiddel: TransportmiddelAlternativer) => {
        if (harAlleredeBlittValidert) {
            validerKvittering(null, null, transportmiddel)
        }
    }

    return (
        <Modal
            isOpen={åpenFilopplasterModal}
            onRequestClose={() => lukkModal()}
            closeButton
            contentLabel="Modal"
            className="filopplaster-modal"
        >
            <div className="modal-content">
                <Systemtittel className="kvittering-header"> Ny kvittering </Systemtittel>
                <div className="input-rad">
                    <Datovelger
                        id={kvitteringDatoSpørsmål.id}
                        className="periode-element"
                        label="Dato"
                        mode="single"
                        onChange={(nyDato) => oppdaterDato(nyDato[0])}
                        feil={fåFeilmeldingTilInput(kvitteringDatoSpørsmål.id)}
                        maksDato=""
                    />
                    <div>
                        <Element className="kvittering-beløp-input">{kvitteringTotaltBeløpSpørsmål.tittel}</Element>
                        <Input
                            inputMode={kvitteringTotaltBeløpSpørsmål.inputMode}
                            value={beløp}
                            pattern="[0-9]*"
                            bredde={kvitteringTotaltBeløpSpørsmål.bredde}
                            onChange={(e) => handleBeløpChange(e.target.value)}
                            id={kvitteringTotaltBeløpSpørsmål.id}
                            feil={fåFeilmeldingTilInput(kvitteringTotaltBeløpSpørsmål.id)}
                        />
                    </div>
                </div>
                <div>
                    <SkjemaGruppe feil={fåFeilmeldingTilInput(kvitteringTransportmiddelSpørsmål.id)}>
                        <TransportmiddelKvittering handleChange={(
                            transportmiddel,
                        ) => handleTransportmiddelChange(transportmiddel)}
                        />
                    </SkjemaGruppe>
                </div>
                <Fil fil={uopplastetFil} className="opplastede-filer" />
                {laster
                    ? (<NavFrontendSpinner className="lagre-kvittering" />)
                    : (
                        <Knapp htmlType="submit"
                            className="lagre-kvittering"
                            onClick={() => (
                                uopplastetFil
                                    ? lagreKvittering(uopplastetFil)
                                    : logger.info('Noen har prøvd å laste opp en tom fil')
                            )}
                        >
                            Lagre kvittering
                        </Knapp>
                    )}
                <Vis hvis={valideringsFeil.length > 0}>
                    <Feiloppsummering tittel={tekst('filopplaster_modal.feiloppsummering')} feil={valideringsFeil} />
                </Vis>
            </div>
        </Modal>
    )
}

export default FilopplasterModal
