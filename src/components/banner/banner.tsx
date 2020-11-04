import './banner.less'

import { Systemtittel } from 'nav-frontend-typografi'
import React from 'react'

import busImg from './buss.png'
import treImg from './tre.png'

interface BannerProps {
    tittel: string;
}

const Banner = ({ tittel }: BannerProps) => {
    return (
        <header className="sidebanner">
            <Systemtittel tag="h1" className="sidebanner__tittel">
                {tittel}
            </Systemtittel>
            <div className="bannerikoner">
                <img src={busImg} className="bannerikon" alt="" width="40" />
                <img className="bannerikon" src={treImg} alt="" width="15" />
            </div>
        </header>
    )
}

export default Banner
