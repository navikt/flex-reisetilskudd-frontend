import constate from 'constate'
import { useState } from 'react'

import { Reisetilskudd, Sykmelding, Transportmidler } from '../../types'

export const [ AppStoreProvider, useAppStore ] = constate(() => {
    const [ reisetilskuddene, setReisetilskuddene ] = useState<Reisetilskudd[]>([])
    const [ valgtReisetilskudd, setValgtReisetilskudd ] = useState<Reisetilskudd>()
    const [ sykmeldinger, setSykmeldinger ] = useState<Sykmelding[]>([])
    const [ valgtSykmelding, setValgtSykmelding ] = useState<Sykmelding>()
    const [ openModal, setOpenModal ] = useState<boolean>(false)
    const [ lasteFeil, setLasteFeil ] = useState<string[]>([])
    const [ uopplastetFil, setUopplastetFil ] = useState<File | null>(null)
    const [ typeKvittering, setTypeKvittering ] = useState<Transportmidler>()

    return {
        reisetilskuddene, setReisetilskuddene,
        valgtReisetilskudd, setValgtReisetilskudd,
        sykmeldinger, setSykmeldinger,
        valgtSykmelding, setValgtSykmelding,
        openModal, setOpenModal,
        lasteFeil, setLasteFeil,
        uopplastetFil, setUopplastetFil,
        typeKvittering, setTypeKvittering
    }
})
