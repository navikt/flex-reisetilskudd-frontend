import './klikkbar.less'

import { Knapp } from 'nav-frontend-knapper'
import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'

import { tekst } from '../../utils/tekster'

const SendKnapp = (): ReactElement => {
    const history = useHistory()

    function handleClick() {
        history.push('/bekreftelse')
    }

    return (
        <div className="videre-knapp">
            <Knapp className="send-knapp" type="hoved" onClick={() => handleClick()}>
                {tekst('klikkbar.send-knapp.tekst')}
            </Knapp>
        </div>
    )
}

export default SendKnapp
