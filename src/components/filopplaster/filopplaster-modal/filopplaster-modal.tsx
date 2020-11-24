import './filopplaster-modal.less'

import Modal from 'nav-frontend-modal'
import { FeiloppsummeringFeil } from 'nav-frontend-skjema'
import { Systemtittel } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import FeilListe from '../../diverse/feil-liste'
import Vis from '../../diverse/vis'
import KvitteringForm from './kvittering-form'

const FilopplasterModal = () => {
    const { lasteFeil, setLasteFeil, openModal, setOpenModal, valgtSykmelding } = useAppStore()

    Modal.setAppElement('#maincontent')

    const lukkModal = () => {
        setOpenModal(false)
        setLasteFeil([])
    }

    const feilliste: FeiloppsummeringFeil[] = []

    lasteFeil.forEach((feil: any) =>
        feilliste.push({
            skjemaelementId: '',
            feilmelding: feil
        })
    )

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
                    <KvitteringForm />
                </Vis>
            </div>
        </Modal>
    )
}

export default FilopplasterModal
