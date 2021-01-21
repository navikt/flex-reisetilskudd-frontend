import './sykmelding-panel.less'
import React, { useState } from 'react'
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel'
import plaster from '../../pages/tilskuddside/plaster.svg'
import plasterHover from '../../pages/tilskuddside/plaster-hover.svg'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import SykmeldingPerioder from './sykmelding-innhold/sykmelding-perioder'
import ArbeidsgiverInfo from './sykmelding-innhold/arbeidsgiver-info'
import SykmeldingDato from './sykmelding-innhold/sykmelding-dato'
import ArbeidssituasjonInfo from './sykmelding-innhold/arbeidssituasjon-info'
import Vis from '../diverse/vis'
import { useAppStore } from '../../data/stores/app-store'
import { tekst } from '../../utils/tekster'

interface SykmeldingProps {
    apen?: boolean;
}

const SykmeldingPanel = ({ apen }: SykmeldingProps) => {
    const { valgtSykmelding } = useAppStore()
    const [ erApen, setErApen ] = useState<boolean>(apen || false)

    return (
        <EkspanderbartpanelBase
            className="sykmelding-panel"
            apen={erApen}
            onClick={() => setErApen(!erApen)}
            tittel={
                <div className="orientering">
                    <img src={plaster} className="plaster" alt="" />
                    <img src={plasterHover} className="plaster--hover" alt="" />
                    <Undertittel className="sykmelding-panel__tittel">
                        {tekst('sykmelding.tittel')}
                    </Undertittel>
                </div>
            }
        >
            <Vis hvis={!valgtSykmelding}>
                {tekst('sykmelding.dessverre')}
            </Vis>
            <Vis hvis={valgtSykmelding}>
                <SykmeldingPerioder />
                <ArbeidsgiverInfo />
                <SykmeldingDato />
                <ArbeidssituasjonInfo />
            </Vis>

            <div className="lenkerad">
                <button type="button"
                    className="lenke"
                    aria-pressed={!erApen}
                    tabIndex={(erApen ? null : -1) as any}
                    onClick={() => setErApen(!erApen)}
                >
                    <Normaltekst tag="span">
                        {'Lukk'}
                    </Normaltekst>
                </button>
            </div>
        </EkspanderbartpanelBase>
    )
}

export default SykmeldingPanel
