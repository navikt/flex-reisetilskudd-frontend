import './side-nav.less'

import { HoyreChevron, VenstreChevron } from 'nav-frontend-chevron'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'

export const sider = [ 'Utbetaling', 'Transport', 'Kvitteringer', 'Bekreft og send' ]

const SideNav = () => {
    const history = useHistory()
    const { id, steg } = useParams<RouteParams>()
    const stegNum = Number(steg)
    const min = 1, max = 4

    const handleChange = (e: any) => {
        history.push('/soknaden/' + id + '/' + (e.target.value))
    }

    const venstreKlikk = () => {
        if (stegNum > min) {
            history.push('/soknaden/' + id + '/' + (stegNum - 1))
        } else {
            history.push('/soknaden/' + id)
        }
    }

    const hoyreKlikk = () => {
        if (stegNum < max) {
            history.push('/soknaden/' + id + '/' + (stegNum + 1))
        }
    }

    return (
        <section className="side_nav">
            <button onClick={venstreKlikk} disabled={stegNum === min}>
                <VenstreChevron />
            </button>
            <select onChange={handleChange} value={stegNum}>
                {sider.map((side, index) => {
                    return (
                        <option value={index + 1} key={index}>
                            {`${index + 1} av ${sider.length}: ${side}`}
                        </option>
                    )
                })}
            </select>
            <button onClick={hoyreKlikk} disabled={stegNum === max}>
                <HoyreChevron />
            </button>
        </section>
    )
}

export default SideNav
