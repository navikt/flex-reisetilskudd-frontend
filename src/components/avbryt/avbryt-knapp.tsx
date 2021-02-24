import './avbryt-knapp.less'

import { Normaltekst } from 'nav-frontend-typografi'
import Vis from '../diverse/vis'
import { Fareknapp } from 'nav-frontend-knapper'
import { tekst } from '../../utils/tekster'
import { useEffect, useRef, useState } from 'react'
import env from '../../utils/environment'
import { getUrlTilSoknad } from '../../utils/utils'
import { useAppStore } from '../../data/stores/app-store'
import { Reisetilskudd } from '../../types/types'
import { useHistory } from 'react-router-dom'
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper'
import { post } from '../../data/fetcher/fetcher'

const AvbrytKnapp = () => {
    const { valgtReisetilskudd, setValgtReisetilskudd, reisetilskuddene, setReisetilskuddene } = useAppStore()
    const [ avbryter, setAvbryter ] = useState<boolean>(false)
    const avbrytDialog = useRef<HTMLDivElement>(null)
    const [ vilAvbryte, setVilAvbryte ] = useState<boolean>(false)
    const [ fetchFeilmelding, setFetchFeilmelding ] = useState<string | null>(null)
    const history = useHistory()

    useEffect(() => {
        if (vilAvbryte) {
            window.scrollTo({ top: avbrytDialog!.current!.offsetTop, left: 0, behavior: 'smooth' })
        }
    }, [ vilAvbryte ])

    const handleVilAvbryte = (e: any) => {
        e.preventDefault()
        setVilAvbryte(!vilAvbryte)
    }

    const handleAvbryt = async(e: any) => {
        e.preventDefault()
        if (avbryter) return
        setAvbryter(true)
        post(
            `${env.flexGatewayRoot}/flex-reisetilskudd-backend/api/v1/reisetilskudd/${valgtReisetilskudd!.id}/avbryt`
        ).then(() => {
            const nyReisetilskudd = {
                ...valgtReisetilskudd,
                status: 'AVBRUTT',
                avbrutt: new Date()
            } as Reisetilskudd
            setReisetilskuddene(reisetilskuddene.map(r => r.id === valgtReisetilskudd!.id ? nyReisetilskudd : r) as any)
            setValgtReisetilskudd(nyReisetilskudd)
            history.push(getUrlTilSoknad(nyReisetilskudd))
        }).catch(() => {
            setFetchFeilmelding('Det skjedde en feil i baksystemene, prøv igjen senere')
        }).finally(() => {
            setAvbryter(false)
        })
    }

    return (
        <>
            <button className="lenke avbrytlenke" onClick={handleVilAvbryte}>
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

                    <Vis hvis={fetchFeilmelding}>
                        <AlertStripeAdvarsel>
                            <Normaltekst>{fetchFeilmelding}</Normaltekst>
                        </AlertStripeAdvarsel>
                    </Vis>

                    <button className="avbrytlenke lenke" onClick={handleVilAvbryte}>
                        {tekst('avbryt.angre')}
                    </button>
                </div>
            </Vis>
        </>
    )
}

export default AvbrytKnapp
