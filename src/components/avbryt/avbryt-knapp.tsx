import './avbryt-knapp.less'

import { Normaltekst } from 'nav-frontend-typografi'
import Vis from '../diverse/vis'
import { Fareknapp } from 'nav-frontend-knapper'
import { tekst } from '../../utils/tekster'
import { useEffect, useRef, useState } from 'react'
import env from '../../utils/environment'
import { redirectTilLoginHvis401 } from '../../utils/utils'
import { useAppStore } from '../../data/stores/app-store'
import { Reisetilskudd, ReisetilskuddStatus } from '../../types/types'
import { logger } from '../../utils/logger'
import { useHistory } from 'react-router-dom'

const AvbrytKnapp = () => {
    const { valgtReisetilskudd, setValgtReisetilskudd, reisetilskuddene, setReisetilskuddene } = useAppStore()
    const [ avbryter, setAvbryter ] = useState<boolean>(false)
    const avbrytDialog = useRef<HTMLDivElement>(null)
    const [ vilAvbryte, setVilAvbryte ] = useState<boolean>(false)
    const history = useHistory()

    useEffect(() => {
        if (vilAvbryte) {
            window.scrollTo({ top: avbrytDialog!.current!.offsetTop, left: 0, behavior: 'smooth' })
        }
    }, [ vilAvbryte ])

    const handleVilAvbryte = () => {
        setVilAvbryte(!vilAvbryte)
    }

    const handleAvbryt = async() => {
        if(avbryter) return
        setAvbryter(true)
        try {
            const res = await fetch(env.backendUrl + `/api/v1/reisetilskudd/${valgtReisetilskudd!.reisetilskuddId}/avbryt`, {
                method: 'POST',
                credentials: 'include'
            })
            const status = res.status
            if (redirectTilLoginHvis401(res)) {
                return
            }
            else if (status === 200) {
                const nyReisetilskudd = { ...valgtReisetilskudd, status: ReisetilskuddStatus.AVBRUTT, avbrutt: new Date() } as Reisetilskudd
                setReisetilskuddene(reisetilskuddene.map(r => r.reisetilskuddId === valgtReisetilskudd!.reisetilskuddId ? nyReisetilskudd : r) as any)
                setValgtReisetilskudd(nyReisetilskudd)
                history.push(`/soknaden/${valgtReisetilskudd!.reisetilskuddId}/avbrutt`)
            } else {
                logger.error('Feil ved AVBYTING av reisetilskudd', res)
                // TODO: Sett opp feilmelding
            }
        } finally {
            setAvbryter(false)
        }
    }

    return (
        <div className="avbrytDialog blokk-l">
            <button className="lenke avbrytlenke avbrytDialog__trigger" onClick={handleVilAvbryte}>
                <Normaltekst tag="span">{tekst('avbryt.trigger')}</Normaltekst>
            </button>
            <Vis hvis={vilAvbryte}>
                <div ref={avbrytDialog} className="avbrytDialog__dialog pekeboble">
                    <Normaltekst className="blokk-s">{tekst('avbryt.sporsmal')}</Normaltekst>
                    <div className="blokk-xs">
                        <Fareknapp spinner={avbryter} onClick={handleAvbryt}>
                            {tekst('avbryt.ja')}
                        </Fareknapp>
                    </div>
                    <button className="avbrytlenke lenke" onClick={handleVilAvbryte}>
                        {tekst('avbryt.angre')}
                    </button>
                </div>
            </Vis>
        </div>
    )
}

export default AvbrytKnapp
