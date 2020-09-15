import './bekreftelses-side.less'

import React, { useEffect } from 'react'

import { setBodyClass } from '../../utils/utils'
import ListeTekster from './liste-tekster'
import VeienVidere from './veien-videre'

const BekreftelsesSide = () => {

    useEffect(() => {
        setBodyClass('bekreftelses-side')
    }, [])

    return (
        <div className="limit">
            <ListeTekster />
            <VeienVidere />
        </div>
    )
}

export default BekreftelsesSide
