import './header.less'

import { Systemtittel } from 'nav-frontend-typografi'
import React from 'react'

import busImg from '../../assets/buss.png'
import treImg from '../../assets/tre.png'

const Header = () => {
    return (
        <div className="header">
            <Systemtittel className="søknadstittel">Søknad om reisetilskudd</Systemtittel>
            <div className="header-icons">
                <img src={busImg} alt="bussikon" width="40" />
                <img className="treIkon" src={treImg} alt="treikon" width="15" />
            </div>
        </div>
    )
}

export default Header
