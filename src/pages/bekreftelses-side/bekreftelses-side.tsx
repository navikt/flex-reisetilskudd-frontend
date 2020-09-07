import './bekreftelses-side.less'

import React from 'react'

import ListeTekstbox from './liste-tekstbox'
import VeienVidereBox from './veien-videre'

const BekreftelsesSide = () => {
    return (
        <div className="limit">
            <ListeTekstbox />
            <VeienVidereBox />
        </div>
    )
}

export default BekreftelsesSide
