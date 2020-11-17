import constate from 'constate'
import { useState } from 'react'

import { Kvittering, Reisetilskudd, Sykmelding,TransportmiddelAlternativer } from '../../types'
import mockKvitteringer from '../mock/data/kvitteringer'

export const [ AppStoreProvider, useAppStore ] = constate(() => {
    /* GENERELT */
    const [ reisetilskuddene, setReisetilskuddene ] = useState<Reisetilskudd[]>([])
    const [ valgtReisetilskudd, setValgtReisetilskudd ] = useState<Reisetilskudd>()
    const [ sykmeldinger, setSykmeldinger ] = useState<Sykmelding[]>([])
    const [ valgtSykmelding, setValgtSykmelding ] = useState<Sykmelding>()
    const [ feilmeldingTekst, setFeilmeldingTekst ] = useState<string>('')

    /* KVITTERINGSOPPLASTING */
    const [ kvitteringer, setKvitteringer ] = useState<Kvittering[]>(mockKvitteringer)
    const [ uopplastetFil, setUopplastetFil ] = useState<File | null>(null)
    const [ filopplasterFeilmeldinger, setFilopplasterFeilmeldinger ] = useState<string[]>([])
    const [ åpenFilopplasterModal, setÅpenFilopplasterModal ] = useState<boolean>(false)
    const [ transportmiddelKvittering, setTransportmiddelKvittering ] = useState<TransportmiddelAlternativer>()

    return {
        /* GENERELT */
        reisetilskuddene, setReisetilskuddene,
        valgtReisetilskudd, setValgtReisetilskudd,
        sykmeldinger, setSykmeldinger,
        valgtSykmelding, setValgtSykmelding,
        feilmeldingTekst, setFeilmeldingTekst,

        /* KVITTERINGSOPPLASTING */
        kvitteringer, setKvitteringer,
        uopplastetFil, setUopplastetFil,
        filopplasterFeilmeldinger, setFilopplasterFeilmeldinger,
        åpenFilopplasterModal, setÅpenFilopplasterModal,
        transportmiddelKvittering, setTransportmiddelKvittering,
    }
})
