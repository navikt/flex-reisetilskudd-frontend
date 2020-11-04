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

    /* UTBETALINGSSPØRSMÅL */
    const [ activeMegArbeidsgiver, setActiveMegArbeidsgiver ] = useState<string>('')

    /* DAGENS TRANSPORTMIDDEL */
    const [ dagensTransportMiddelEgenBilChecked, setDagensTransportMiddelEgenBilChecked ] = useState<boolean>(false)
    const [ dagensTransportMiddelSyklerChecked, setDagensTransportMiddelSyklerChecked ] = useState<boolean>(false)
    const [ dagensTransportMiddelGårChecked, setDagensTransportMiddelGårChecked ] = useState<boolean>(false)
    const [ dagensTransportMiddelKollektivChecked, setDagensTransportMiddelKollektivChecked ] = useState<boolean>(false)
    const [ månedligeUtgifterState, setMånedligeUtgifterState ] = useState<string>('')
    const [ antallKilometerState, setAntallKilometerState ] = useState<string>('')
    const [ dagensTransportmiddelValidert, setDagensTransportmiddelValidert ] = useState<boolean>()

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

        /* UTBETALINGSSPØRSMÅL */
        activeMegArbeidsgiver, setActiveMegArbeidsgiver,

        /* DAGENS TRANSPORTMIDDEL */
        dagensTransportMiddelEgenBilChecked, setDagensTransportMiddelEgenBilChecked,
        dagensTransportMiddelSyklerChecked, setDagensTransportMiddelSyklerChecked,
        dagensTransportMiddelGårChecked, setDagensTransportMiddelGårChecked,
        dagensTransportMiddelKollektivChecked, setDagensTransportMiddelKollektivChecked,
        månedligeUtgifterState, setMånedligeUtgifterState,
        antallKilometerState, setAntallKilometerState,
        dagensTransportmiddelValidert, setDagensTransportmiddelValidert,

        /* KVITTERINGSOPPLASTING */
        kvitteringer, setKvitteringer,
        uopplastetFil, setUopplastetFil,
        filopplasterFeilmeldinger, setFilopplasterFeilmeldinger,
        åpenFilopplasterModal, setÅpenFilopplasterModal,
        transportmiddelKvittering, setTransportmiddelKvittering,
    }
})
