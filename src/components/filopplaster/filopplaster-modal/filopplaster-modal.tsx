import './filopplaster-modal.less'

import Modal from 'nav-frontend-modal'
import React from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import KvitteringForm from './kvittering-form'

const FilopplasterModal = () => {
    const { openModal, setOpenModal, valgtSykmelding } = useAppStore()

    Modal.setAppElement('#maincontent')

    const lukkModal = () => {
        setOpenModal(false)
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
                <KvitteringForm />
            </div>
        </Modal>
    )
}

export default FilopplasterModal
