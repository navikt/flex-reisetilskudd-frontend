import constate from 'constate'
import { useState } from 'react'

import { Kvittering, Reisetilskudd, Sykmelding, Transportmidler } from '../../types'
import mockKvitteringer from '../mock/data/kvitteringer'

export const [ AppStoreProvider, useAppStore ] = constate(() => {
    const [ reisetilskuddene, setReisetilskuddene ] = useState<Reisetilskudd[]>([])
    const [ valgtReisetilskudd, setValgtReisetilskudd ] = useState<Reisetilskudd>()
    const [ sykmeldinger, setSykmeldinger ] = useState<Sykmelding[]>([])
    const [ valgtSykmelding, setValgtSykmelding ] = useState<Sykmelding>()
    const [ kvitteringer, setKvitteringer ] = useState<Kvittering[]>(mockKvitteringer)
    const [ openModal, setOpenModal ] = useState<boolean>(false)
    const [ uopplastetFil, setUopplastetFil ] = useState<File | null>(null)
    const [ typeKvittering, setTypeKvittering ] = useState<Transportmidler>()

    return {
        reisetilskuddene, setReisetilskuddene,
        valgtReisetilskudd, setValgtReisetilskudd,
        sykmeldinger, setSykmeldinger,
        valgtSykmelding, setValgtSykmelding,
        kvitteringer, setKvitteringer,
        openModal, setOpenModal,
        uopplastetFil, setUopplastetFil,
        typeKvittering, setTypeKvittering
    }
})
