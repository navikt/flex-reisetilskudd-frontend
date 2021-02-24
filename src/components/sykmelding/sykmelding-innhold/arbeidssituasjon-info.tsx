import React from 'react'
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi'
import { tekst } from '../../../utils/tekster'
import { useAppStore } from '../../../data/stores/app-store'

const ArbeidssituasjonInfo = () => {
    const { valgtSykmelding } = useAppStore()
    const arbeidssituasjon = valgtSykmelding
        ?.sykmeldingStatus
        .sporsmalOgSvarListe
        ?.find((sporsmal) => sporsmal.shortName === 'ARBEIDSSITUASJON' )
        ?.svar?.svar

    if (!arbeidssituasjon) return null

    return (
        <div className="avsnitt">
            <EtikettLiten tag="h3" className="avsnitt-hode">
                {tekst('sykmelding.arbeidssituasjon')}
            </EtikettLiten>
            <Normaltekst>{
                tekst(`sykmelding.arbeidssituasjon.alternativ.${arbeidssituasjon?.toLowerCase()}` as any)}
            </Normaltekst>
        </div>
    )
}

export default ArbeidssituasjonInfo
