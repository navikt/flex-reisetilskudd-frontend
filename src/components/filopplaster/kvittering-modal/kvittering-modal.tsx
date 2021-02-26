import './kvittering-modal.less'

import Modal from 'nav-frontend-modal'
import React from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import KvitteringForm from './kvittering-form'
import { SpmProps } from '../../sporsmal/sporsmal-form/sporsmal-form'

const KvitteringModal = ({ sporsmal }: SpmProps) => {
    const { openModal, setOpenModal } = useAppStore()

    Modal.setAppElement('#maincontent')

    const lukkModal = () => {
        setOpenModal(false)
    }

    return (
        <Modal
            isOpen={openModal}
            onRequestClose={() => lukkModal()}
            closeButton
            contentLabel="Modal"
            className="kvittering_modal"
        >
            <div className="modal-content">
                <KvitteringForm sporsmal={sporsmal} />
            </div>
        </Modal>
    )
}

export default KvitteringModal
