import constate from 'constate'
import { useState } from 'react'

import { Reisetilskudd, Sykmelding } from '../../types'

export const [ AppStoreProvider, useAppStore ] = constate(() => {
    const [ reisetilskuddene, setReisetilskuddene ] = useState<Reisetilskudd[]>([])
    const [ valgtReisetilskudd, setValgtReisetilskudd ] = useState<Reisetilskudd>()
    const [ sykmeldinger, setSykmeldinger ] = useState<Sykmelding[]>([])
    const [ valgtSykmelding, setValgtSykmelding ] = useState<Sykmelding>()
    const [ openModal, setOpenModal ] = useState<boolean>(false)
    const [ valgtFil, setValgtFil ] = useState<File | null>(null)

    return {
        reisetilskuddene, setReisetilskuddene,
        valgtReisetilskudd, setValgtReisetilskudd,
        sykmeldinger, setSykmeldinger,
        valgtSykmelding, setValgtSykmelding,
        openModal, setOpenModal,
        valgtFil, setValgtFil,
    }
})
