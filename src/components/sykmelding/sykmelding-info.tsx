import './sykmelding-info.less'

import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React, { ReactElement } from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { Sykmelding, SykmeldingOpplysning, SykmeldingOpplysningEnum } from '../../types/types'
import { tekst } from '../../utils/tekster'
import { CheckedIkon } from '../diverse/checked-ikon/checked-ikon'
import Vis from '../diverse/vis'
import PeriodeTekst from './periode-tekst'
import plaster from '../../pages/tilskuddside/plaster.svg'
import plasterHover from '../../pages/tilskuddside/plaster-hover.svg'
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'

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

// TODO: Sett opp utifra skisser
const SykmeldingInfo = (): ReactElement => {
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
        <Ekspanderbartpanel className="sykmelding-panel" tittel={
            <>
                <img src={plaster} className="plaster" alt="" />
                <img src={plasterHover} className="plaster--hover" alt="" />
                <Undertittel className="sykmelding-panel__tittel">{tekst('tilskudd.side.sykmeldinginfo')}</Undertittel>
            </>
        }>
            <Vis hvis={vårSykmelding !== undefined}>
                <Element className="element-tittel">
                    {tekst('sykmelding.periode')}
                </Element>
                <PeriodeTekst fraDato={fraDato} tilDato={tilDato} />

                <Element className="element-tittel">
                    {tekst('sykmelding.diagnose')}
                </Element>
                {visVårVerdi(SykmeldingOpplysningEnum.DIAGNOSE)}

                <Element className="element-tittel">
                    {tekst('sykmelding.diagnosekode')}
                </Element>
                {visVårVerdi(SykmeldingOpplysningEnum.DIAGNOSEKODE)}

                <Element className="element-tittel">
                    {tekst('sykmelding.bidiagnose')}
                </Element>
                {visVårVerdi(SykmeldingOpplysningEnum.BI_DIAGNOSER)}

                <Element className="element-tittel">
                    {tekst('sykmelding.reisetilskudd')}
                </Element>
                {visVårVerdi(SykmeldingOpplysningEnum.REISETILSKUDD)}

                <Element className="element-tittel">
                    {tekst('sykmelding.beskriv')}
                </Element>
                {visVårVerdi(SykmeldingOpplysningEnum.BESKRIV_HENSYN)}

                <Element className="element-tittel">
                    {tekst('sykmelding.arbeidsgiver')}
                </Element>
                {visVårVerdi(SykmeldingOpplysningEnum.ARBEIDSGIVER)}

                <Element className="element-tittel">
                    {tekst('sykmelding.lege-sykmelder')}
                </Element>
                {visVårVerdi(SykmeldingOpplysningEnum.SYKMELDER)}
            </Vis>
            <Vis hvis={vårSykmelding === undefined}>
                <Normaltekst>
                    {tekst('sykmelding.dessverre')}
                </Normaltekst>
            </Vis>
        </Ekspanderbartpanel>
    )
}

export default SykmeldingInfo
