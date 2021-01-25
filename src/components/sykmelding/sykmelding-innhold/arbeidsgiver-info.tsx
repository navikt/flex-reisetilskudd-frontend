import React from 'react'
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi'
import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'

const ArbeidsgiverInfo = () => {
    const { valgtSykmelding } = useAppStore()

    if (valgtSykmelding?.arbeidsgiver)
        return (
            <div className="avsnitt">
                <EtikettLiten tag="h3" className="avsnitt-hode">
                    {tekst('sykmelding.arbeidsgiver')}
                </EtikettLiten>
                <Normaltekst>
                    {valgtSykmelding.arbeidsgiver.navn}
                </Normaltekst>
            </div>
        )
    else return null
}

export default ArbeidsgiverInfo
