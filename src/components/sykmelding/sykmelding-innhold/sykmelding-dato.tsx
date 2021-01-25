import React from 'react'
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi'
import { useAppStore } from '../../../data/stores/app-store'
import { tilLesbarDatoMedArstall } from '../../../utils/dato'
import { tekst } from '../../../utils/tekster'

const SykmeldingDato = () => {
    const { valgtSykmelding } = useAppStore()

    return (
        <div className="avsnitt">
            <EtikettLiten tag="h3" className="avsnitt-hode">
                {tekst('sykmelding.dato')}
            </EtikettLiten>
            <Normaltekst>
                {tilLesbarDatoMedArstall(valgtSykmelding?.behandletTidspunkt)}
            </Normaltekst>
        </div>
    )
}

export default SykmeldingDato
