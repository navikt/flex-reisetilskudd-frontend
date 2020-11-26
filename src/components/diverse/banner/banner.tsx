import './banner.less'

import { Sidetittel } from 'nav-frontend-typografi'
import React from 'react'

interface BannerProps {
    tittel: string;
}

const Banner = ({ tittel }: BannerProps) => {
    return (
        <header className="sidebanner">
            <Sidetittel tag="h1" className="sidebanner__tittel">
                {tittel}
            </Sidetittel>
        </header>
    )
}

export default Banner
