import constate from 'constate'
import { useState } from 'react'

import { Reisetilskudd, Sykmelding } from '../../types/types'

export const [ AppStoreProvider, useAppStore ] = constate(() => {
    const [ reisetilskuddene, setReisetilskuddene ] = useState<Reisetilskudd[]>([])
    const [ valgtReisetilskudd, setValgtReisetilskudd ] = useState<Reisetilskudd>()
    const [ sykmeldinger, setSykmeldinger ] = useState<Sykmelding[]>([])
    const [ valgtSykmelding, setValgtSykmelding ] = useState<Sykmelding>()
    const [ kvitteringIndex, setKvitteringIndex ] = useState<number>(0)
    const [ openModal, setOpenModal ] = useState<boolean>(false)
    const [ valgtFil, setValgtFil ] = useState<File | null>(null)
    const [ erBekreftet, setErBekreftet ] = useState<boolean>(false)

    return {
        reisetilskuddene, setReisetilskuddene,
        valgtReisetilskudd, setValgtReisetilskudd,
        sykmeldinger, setSykmeldinger,
        valgtSykmelding, setValgtSykmelding,
        kvitteringIndex, setKvitteringIndex,
        openModal, setOpenModal,
        valgtFil, setValgtFil,
        erBekreftet, setErBekreftet
    }
})
