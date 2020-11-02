import './sykmelding-opplysninger.less'

import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { ReactElement } from 'react'

import { CheckedIkon } from '../../assets/ikoner'
import { useAppStore } from '../../data/stores/app-store'
import { Sykmelding, SykmeldingOpplysning, SykmeldingOpplysningEnum } from '../../types/sykmelding'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'
import PeriodeTekst from './periode-tekst'

// TODO: Se litt mer på denne
const fåSykmeldingOpplysningSomInterface = (syk?: Sykmelding): SykmeldingOpplysning | undefined => {
    if (!syk) return undefined
    return {
        id: syk.id,
        fraDato: syk.mulighetForArbeid?.perioder[0]?.fom,
        tilDato: syk.mulighetForArbeid?.perioder[0]?.tom,
        diagnose: syk.diagnose?.hoveddiagnose?.diagnose,
        diagnosekode: syk.diagnose?.hoveddiagnose.diagnosekode,
        bidiagnoser: syk.diagnose?.bidiagnoser[0]?.diagnose,
        reisetilskudd: syk.mulighetForArbeid?.perioder[0]?.reisetilskudd ? 'Reisetilskudd' : 'Ikke reisetilskudd',
        beskrivHensyn: syk.mulighetForArbeid?.aktivitetIkkeMulig433[0],
        arbeidsgiver: syk.mottakendeArbeidsgiver?.navn,
        sykmelder: syk.bekreftelse?.sykmelder,
        aktivitetIkkeMulig434: syk.mulighetForArbeid?.aktivitetIkkeMulig433[0],
    }
}

const SykmeldingOpplysninger = (): ReactElement => {
    const { valgtSykmelding } = useAppStore()
    const vårSykmelding = fåSykmeldingOpplysningSomInterface(valgtSykmelding)

    const fraDato: string = vårSykmelding?.[SykmeldingOpplysningEnum.FRA_DATO] || ''
    const tilDato: string = vårSykmelding?.[SykmeldingOpplysningEnum.TIL_DATO] || ''

    const visVårVerdi = (hvilkenVerdi: SykmeldingOpplysningEnum) => (
        (vårSykmelding && vårSykmelding?.[hvilkenVerdi])
            ? <Normaltekst className="checkedblock"><CheckedIkon />{vårSykmelding?.[hvilkenVerdi]}</Normaltekst>
            : <span className="sykmelding-manglende-opplysninger"> - </span>
    )

    return (
        <>
            <Vis hvis={vårSykmelding !== undefined}>
                <Element className="soknad-tittel">
                    {tekst('sykmelding.periode')}
                </Element>
                <PeriodeTekst fraDato={fraDato} tilDato={tilDato} />

                <Element className="soknad-tittel">
                    {tekst('sykmelding.diagnose')}
                </Element>
                {visVårVerdi(SykmeldingOpplysningEnum.DIAGNOSE)}

                <Element className="soknad-tittel">
                    {tekst('sykmelding.diagnosekode')}
                </Element>
                {visVårVerdi(SykmeldingOpplysningEnum.DIAGNOSEKODE)}

                <Element className="soknad-tittel">
                    {tekst('sykmelding.bidiagnose')}
                </Element>
                {visVårVerdi(SykmeldingOpplysningEnum.BI_DIAGNOSER)}

                <Element className="soknad-tittel">
                    {tekst('sykmelding.reisetilskudd')}
                </Element>
                {visVårVerdi(SykmeldingOpplysningEnum.REISETILSKUDD)}

                <Element className="soknad-tittel">
                    {tekst('sykmelding.beskriv')}
                </Element>
                {visVårVerdi(SykmeldingOpplysningEnum.BESKRIV_HENSYN)}

                <Element className="soknad-tittel">
                    {tekst('sykmelding.arbeidsgiver')}
                </Element>
                {visVårVerdi(SykmeldingOpplysningEnum.ARBEIDSGIVER)}

                <Element className="soknad-tittel">
                    {tekst('sykmelding.lege-sykmelder')}
                </Element>
                {visVårVerdi(SykmeldingOpplysningEnum.SYKMELDER)}
            </Vis>
            <Vis hvis={vårSykmelding === undefined}>
                <Normaltekst>
                    {tekst('sykmelding.dessverre')}
                </Normaltekst>
            </Vis>
        </>
    )
}

export default SykmeldingOpplysninger
