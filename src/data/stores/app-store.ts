import constate from 'constate'
import { useState } from 'react'

import { KvitteringInterface, TransportmiddelAlternativer } from '../../models/kvittering'
import { ReisetilskuddInterface } from '../../models/reisetilskudd'
import { SykmeldingOpplysningInterface } from '../../models/sykmelding'
import mockKvitteringer from '../mock/kvitteringer'

export const [ AppStoreProvider, useAppStore ] = constate(() => {
    /* GENERELT */
    const [ reisetilskuddene, setReisetilskuddene ] = useState<ReisetilskuddInterface[] | undefined>()
    const [ aktivtReisetilskuddId, setAktivtReisetilskuddId ] = useState<string>()

    /* UTBETALINGSSPØRSMÅL */
    const [ activeMegArbeidsgiver, setActiveMegArbeidsgiver ] = useState<string>('')
    const [ utbetalingspørsmålValidert, setUtbetalingspørsmålValidert ] = useState<boolean | undefined>(undefined)

    /* DAGENS TRANSPORTMIDDEL */
    const [ dagensTransportMiddelEgenBilChecked, setDagensTransportMiddelEgenBilChecked ] = useState<boolean>(false)
    const [ dagensTransportMiddelSyklerChecked, setDagensTransportMiddelSyklerChecked ] = useState<boolean>(false)
    const [ dagensTransportMiddelGårChecked, setDagensTransportMiddelGårChecked ] = useState<boolean>(false)
    const [ dagensTransportMiddelKollektivChecked, setDagensTransportMiddelKollektivChecked ] = useState<boolean>(false)
    const [ månedligeUtgifterState, setMånedligeUtgifterState ] = useState<string>('')
    const [ antallKilometerState, setAntallKilometerState ] = useState<string>('')
    const [ dagensTransportmiddelValidert, setDagensTransportmiddelValidert ] = useState<boolean | undefined>(undefined)

    /* KVITTERINGSOPPLASTING */
    const [ kvitteringer, setKvitteringer ] = useState<KvitteringInterface[]>(mockKvitteringer)
    const [ uopplastetFil, setUopplastetFil ] = useState<File | null>(null)
    const [ filopplasterFeilmeldinger, setFilopplasterFeilmeldinger ] = useState<string[]>([])
    const [ åpenFilopplasterModal, setÅpenFilopplasterModal ] = useState<boolean>(false)
    const [ transportmiddelKvittering, setTransportmiddelKvittering ] = useState<TransportmiddelAlternativer>()

    /* OPPLYSNINGER FRA SYKMELDINGEN */
    const [ opplysningerSykmeldinger, setOpplysningerSykmeldinger ] = useState<SykmeldingOpplysningInterface[] | undefined>(undefined)
    const [ sykmeldingID, setSykmeldingID ] = useState<string>('')

    return {
        /* GENERELT */
        reisetilskuddene, setReisetilskuddene,
        aktivtReisetilskuddId, setAktivtReisetilskuddId,

        /* UTBETALINGSSPØRSMÅL */
        activeMegArbeidsgiver, setActiveMegArbeidsgiver,
        utbetalingspørsmålValidert, setUtbetalingspørsmålValidert,

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

        /* OPPLYSNINGER FRA SYKMELDINGEN */
        opplysningerSykmeldinger, setOpplysningerSykmeldinger,
        sykmeldingID, setSykmeldingID,
    }
})
