import './side-nav.less'

import { HoyreChevron, VenstreChevron } from 'nav-frontend-chevron'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import { useAppStore } from '../../data/stores/app-store'

export const sider = [ 'Utbetaling', 'Transport', 'Kvitteringer', 'Bekreft og send' ]

const SideNav = () => {
    const { valgtReisetilskudd: valgt } = useAppStore()

    const history = useHistory()
    const { id, steg } = useParams<RouteParams>()
    const stegNum = Number(steg)
    const min = 1, max = 4

    let steg2ok = false
    let steg3ok = false
    let steg4ok = false
    let nesteStegOk = false

    if (valgt !== undefined) {
        steg2ok = true
        steg3ok = true // valgt!.offentlig > 0 || valgt!.egenBil > 0
        steg4ok = true

        if (stegNum === 1) nesteStegOk = steg2ok
        else if (stegNum === 2) nesteStegOk = steg3ok
        else if (stegNum === 3) nesteStegOk = steg4ok
    }

    const handleChange = (e: any) => {
        if (nesteStegOk) {
            history.push('/soknaden/' + id + '/' + (e.target.value))
        }
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
                            {`${index + 1} av ${sider.length} ${side}`}
                        </option>
                    )
                })}
            </select>
            <button onClick={hoyreKlikk} disabled={stegNum === max || !nesteStegOk}>
                <HoyreChevron />
            </button>
        </section>
    )
}

export default SideNav
