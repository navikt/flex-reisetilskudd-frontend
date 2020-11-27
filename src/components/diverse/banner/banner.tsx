import './banner.less'

import { Sidetittel } from 'nav-frontend-typografi'
import React, { useEffect, useRef } from 'react'

interface BannerProps {
    tittel: string;
}

const Banner = ({ tittel }: BannerProps) => {
    const bannerRef = useRef<HTMLElement>(null)

    useEffect(() => {
        bannerRef.current!.scrollIntoView({ behavior: 'smooth' })
    }, [])

    return (
        <header ref={bannerRef} className="sidebanner">
            <Sidetittel tag="h1" className="sidebanner__tittel">
                {tittel}
            </Sidetittel>
        </header>
    )
}

export default Banner
