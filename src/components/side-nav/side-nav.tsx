import './side-nav.less'

import { HoyreChevron, VenstreChevron } from 'nav-frontend-chevron'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import { useAppStore } from '../../data/stores/app-store'

const SideNav = () => {
    const { valgtReisetilskudd: valgt } = useAppStore()

    const history = useHistory()
    const { id, steg } = useParams<RouteParams>()
    const stegNum = Number(steg)

    const sider = valgt!.sporsmal.map(spm => {
        return spm.overskrift
    })
    sider.push('Oppsummering')

    const min = 1
    const max = sider.length
    const nesteStegOk = valgt!.sporsmal[stegNum - 1]?.svarliste?.svar?.length > 0 || false

    const handleChange = (e: any) => {
        if (valgt!.sporsmal[e.target.value - 1]?.svarliste?.svar?.length > 0 || e.target.value === max.toString()) {
            history.push(`/soknaden/${id}/${e.target.value}`)
        }
    }

    const venstreKlikk = () => {
        if (stegNum >= min) {
            history.push(`/soknaden/${id}/${stegNum - 1}`)
        }
    }

    const hoyreKlikk = () => {
        if (stegNum < max) {
            history.push(`/soknaden/${id}/${stegNum + 1}`)
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
