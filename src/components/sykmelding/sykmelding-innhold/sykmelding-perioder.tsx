import { useAppStore } from '../../../data/stores/app-store'
import React from 'react'
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi'
import { tekst } from '../../../utils/tekster'
import { getDuration, tilLesbarPeriodeMedArstall } from '../../../utils/dato'
import { Periode } from '../../../types/sykmelding'

const SykmeldingPerioder = () => {
    const { valgtSykmelding } = useAppStore()

    const periodetypeTilTekst = (periode: Periode) => {
        switch (periode.type) {
            case 'AKTIVITET_IKKE_MULIG':
                return '100 % sykmeldt'
            case 'AVVENTENDE':
                return 'Aventende'
            case 'BEHANDLINGSDAGER':
                if (periode.behandlingsdager === 1) {
                    return '1 behandlingsdag'
                } else {
                    return 'Behandlingsdager'
                }
            case 'GRADERT':
                return periode.gradert!.grad + ' % sykmeldt'
            case 'REISETILSKUDD':
                return 'Reisetilskudd'
        }
    }

    return (
        <div className="sykmelding-perioder">
            {valgtSykmelding?.sykmeldingsperioder.map((periode, idx) => {
                const dager = getDuration(new Date(periode.fom), new Date(periode.tom)) + ' dager'

                return (
                    <div className="avsnitt" key={idx}>
                        <EtikettLiten tag="h3" className="avsnitt-hode">
                            {tekst('sykmelding.periode')}
                        </EtikettLiten>
                        <Normaltekst>
                            <strong>
                                {tilLesbarPeriodeMedArstall(periode.fom, periode.tom)}
                            </strong> &bull; {dager}
                        </Normaltekst>
                        <Normaltekst>
                            {periodetypeTilTekst(periode)}
                        </Normaltekst>
                    </div>
                )
            })

            }
        </div>
    )
}

export default SykmeldingPerioder
