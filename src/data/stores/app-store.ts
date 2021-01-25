import constate from 'constate'
import { useState } from 'react'

import { Reisetilskudd } from '../../types/types'
import { Sykmelding } from '../../types/sykmelding'

export const [ AppStoreProvider, useAppStore ] = constate(() => {
    const [ reisetilskuddene, setReisetilskuddene ] = useState<Reisetilskudd[]>([])
    const [ valgtReisetilskudd, setValgtReisetilskudd ] = useState<Reisetilskudd>()
    const [ sykmeldinger, setSykmeldinger ] = useState<Sykmelding[]>([])
    const [ valgtSykmelding, setValgtSykmelding ] = useState<Sykmelding>()
    const [ kvitteringIndex, setKvitteringIndex ] = useState<number>(0)
    const [ openModal, setOpenModal ] = useState<boolean>(false)
    const [ valgtFil, setValgtFil ] = useState<File | null>(null)

    return {
        reisetilskuddene, setReisetilskuddene,
        valgtReisetilskudd, setValgtReisetilskudd,
        sykmeldinger, setSykmeldinger,
        valgtSykmelding, setValgtSykmelding,
        kvitteringIndex, setKvitteringIndex,
        openModal, setOpenModal,
        valgtFil, setValgtFil,
    }
})
