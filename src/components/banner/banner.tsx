import './banner.less'

import { Systemtittel } from 'nav-frontend-typografi'
import React from 'react'

import busImg from '../../assets/buss.png'
import treImg from '../../assets/tre.png'
import { tekst } from '../../utils/tekster'

const Banner = () => {
    return (
        <header className="sidebanner">
            <Systemtittel tag="h1" className="sidebanner__tittel">
                {tekst('banner.sidetittel')}
            </Systemtittel>
            <div className="bannerikoner">
                <img src={busImg} className="bannerikon" alt="" width="40" />
                <img className="bannerikon" src={treImg} alt="" width="15" />
            </div>
        </header>
    )
}

export default Banner
