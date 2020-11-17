import { Knapp } from 'nav-frontend-knapper'
import React, { useEffect, useRef, useState } from 'react'

import { tekst } from '../../utils/tekster'

interface KnapperadProps {
    onSubmit: () => void;
}

const Knapperad = ({ onSubmit }: KnapperadProps) => {
    const avbrytDialog = useRef<HTMLDivElement>(null)
    const [ vilAvbryte ] = useState<boolean>(false)

    useEffect(() => {
        if (vilAvbryte) {
            window.scrollTo({ top: avbrytDialog!.current!.offsetTop, left: 0, behavior: 'smooth' })
        }
    }, [ vilAvbryte ])

    return (
        <div className="knapperad">
            <Knapp type="hoved" onClick={() => onSubmit}>
                {tekst('klikkbar.videre-knapp.tekst')}
            </Knapp>
        </div>
    )
}

export default Knapperad
