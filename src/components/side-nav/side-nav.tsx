import './side-nav.less'

import { HoyreChevron, VenstreChevron } from 'nav-frontend-chevron'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import { SEPARATOR } from '../../utils/constants'

export const sider = [
    'Forside',
    'Utbetaling',
    'Transport',
    'Kvitteringer',
    'Send inn',
]

export const pathUtenSteg = (pathname: string): string => {
    const arr: string[] = pathname.split(SEPARATOR)
    arr.pop()
    return arr.join(SEPARATOR)
}

const SideNav = () => {
    const [ sideNr, setSideNr ] = useState<number>(1)
    const history = useHistory()
    const { id, steg } = useParams<RouteParams>()
    const stegNum = Number(steg)

    const handleChange = (e: any) => {
        setSideNr(e.target.value)
        history.push('/soknaden/' + id + '/' + (sideNr))
    }

    return (
        <section className="side_nav">
            <button onClick={() => history.push('/soknaden/' + id + '/' + (stegNum - 1))}>
                <VenstreChevron />
            </button>
            <select onChange={handleChange}>
                {sider.map((side, index) => {
                    return (
                        <option value={index + 1} key={index}>{side}</option>
                    )
                })}
            </select>
            <button onClick={() => history.push('/soknaden/' + id + '/' + (stegNum + 1))}>
                <HoyreChevron />
            </button>
        </section>
    )
}

export default SideNav
