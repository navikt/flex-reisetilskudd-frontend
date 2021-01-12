import './sykmelding-panel.less'
import React from 'react'
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import plaster from '../../pages/tilskuddside/plaster.svg'
import plasterHover from '../../pages/tilskuddside/plaster-hover.svg'
import { Undertittel } from 'nav-frontend-typografi'
import SykmeldingInfo from './sykmelding-info'

interface SykmeldingProps {
    tittel: string;
}

const SykmeldingPanel = ({ tittel }: SykmeldingProps) => {
    return (
        <>
            <Ekspanderbartpanel className="sykmelding-panel" tittel={
                <div>
                    <img src={plaster} className="plaster" alt="" />
                    <img src={plasterHover} className="plaster--hover" alt="" />
                    <Undertittel className="sykmelding-panel__tittel">{tittel}</Undertittel>
                </div>
            }>
                <SykmeldingInfo />
            </Ekspanderbartpanel>
        </>
    )
}

export default SykmeldingPanel
