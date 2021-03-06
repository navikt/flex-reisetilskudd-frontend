import './dager-komp.less'

import { ErrorMessage } from '@hookform/error-message'
import dayjs, { Dayjs } from 'dayjs'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import Vis from '../../diverse/vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { Sporsmal, Svar } from '../../../types/types'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isoWeek from 'dayjs/plugin/isoWeek'
import { maaneder, sammeAar, sammeMnd } from '../../../utils/dato'
import { tekst } from '../../../utils/tekster'
import { useAppStore } from '../../../data/stores/app-store'
import { hentSvar } from '../hent-svar'
import KalenderIkon from './kalender-ikon.svg'
import SlettIkon from './slett-ikon.svg'

dayjs.extend(weekOfYear)
dayjs.extend(isoWeek)

interface KalenderDag {
    dayjs: Dayjs;
    tid: 'foran' | 'etter' | 'inni';
}

const DagerKomp = ({ sporsmal }: SpmProps) => {
    const { setErBekreftet } = useAppStore()
    const [ lokal, setLokal ] = useState<string[]>([])
    const { register, errors } = useFormContext()

    const dagerSidenMandag = (spm: Sporsmal) => {
        return ((dayjs(spm.min!).day() - 1)) % 7
    }

    const dagerTilFredag = (spm: Sporsmal) => {
        return (5 - dayjs(spm.max!).day())
    }

    const kalTittel = () => {
        const etaar = sammeAar(sporsmal)
        const enmnd = sammeMnd(sporsmal)
        const min = dayjs(sporsmal.min!)
        const max = dayjs(sporsmal.max!)
        if (enmnd && etaar) {
            return `${maaneder[min.month()]} ${min.year()}`
        } else if (!enmnd && etaar) {
            return `${maaneder[min.month()]} - ${maaneder[max.month()]} ${max.year()}`
        } else if (!enmnd && !etaar) {
            return `${maaneder[min.month()]} ${min.year()} - ${maaneder[max.month()]} ${max.year()}`
        }
    }

    const minWeek = dayjs(sporsmal.min!).isoWeek()
    const maxWeek = dayjs(sporsmal.max!).isoWeek()
    const uker: number[] = []
    for (let i = 0; i <= (maxWeek - minWeek); i++) {
        uker.push(minWeek + i)
    }

    let tell = 1
    const alledager: any = []

    uker.forEach(uke => {
        const pre = dagerSidenMandag(sporsmal)
        const post = dagerTilFredag(sporsmal)

        if (uke === minWeek) {
            const ukedager: KalenderDag[] = []
            for (let i = 0; i < pre; i++) {
                ukedager.push({ dayjs: dayjs(sporsmal.min!).isoWeekday(i + 1), tid: 'foran' })
            }
            for (let i = ukedager.length; i < 7; i++) {
                ukedager.push({ dayjs: dayjs(sporsmal.min!).isoWeekday(i + 1), tid: 'inni' })
            }
            alledager.push(ukedager)

        } else if (uke === maxWeek) {
            const ukedager: KalenderDag[] = []
            for (let i = 0; i < (5 - post); i++) {
                ukedager.push({ dayjs: dayjs(sporsmal.max!).isoWeekday(i + 1), tid: 'inni' })
            }
            for (let i = ukedager.length; i < 7; i++) {
                ukedager.push({ dayjs: dayjs(sporsmal.max!).isoWeekday(i + 1), tid: 'etter' })
            }
            alledager.push(ukedager)

        } else {
            const start = dayjs(sporsmal.min!)
            const ukedager: KalenderDag[] = []
            for (let i = 1; i <= 7; i++) {
                ukedager.push({ dayjs: start.add((tell * 7) + 1, 'days').isoWeekday(i), tid: 'inni' })
            }
            alledager.push(ukedager)
            tell++
        }
    })

    useEffect(() => {
        const lagret: Svar[] = hentSvar(sporsmal)
        lagret.forEach((svar, idx) => {
            if (svar?.verdi !== undefined && svar?.verdi !== '') {
                lokal[idx] = svar.verdi
            }
        })
        setLokal(lokal)
        setErBekreftet(lokal.length > 0)
        // eslint-disable-next-line
    }, [ sporsmal ])

    const radioKlikk = (value: string) => {
        const index = lokal.indexOf(value)
        if (index > -1) {
            lokal.splice(index, 1)
        } else {
            lokal.push(value)
        }
        setLokal(Array.from(new Set(lokal)))
        setErBekreftet(lokal.length > 0)
    }

    const velgAlle = () => {
        const dager: string[] = []
        alledager.forEach((uke: any) => {
            for (let i = 0; i < uke.length; i++) {
                const dag = uke[i]
                if (dag.tid === 'inni' && dag.dayjs.isoWeekday() < 6) {
                    dager.push(dag.dayjs.format('YYYY-MM-DD'))
                }
            }
        })
        setLokal(Array.from(new Set(dager)))
    }

    const fjernAlle = () => {
        setLokal([])
    }

    return (
        <>
            <Vis hvis={sporsmal.sporsmalstekst !== null}>
                <Element tag="h3" className="skjema__sporsmal">{sporsmal.sporsmalstekst}</Element>
            </Vis>

            <div className="skjemaelement">
                <div className="skjema__dager">
                    <Normaltekst tag="h4" className="kalender__tittel">{kalTittel()}</Normaltekst>
                    <div className="ukedager">
                        <span>uke</span>
                        <span>Man</span>
                        <span>Tir</span>
                        <span>Ons</span>
                        <span>Tor</span>
                        <span>Fre</span>
                        <span>Lør</span>
                        <span>Søn</span>
                    </div>

                    {alledager.map((ukedager: KalenderDag[], ukeidx: number) => {
                        return (
                            <div className="kalenderuke" key={ukeidx}>
                                <div className="ukenr">{uker[ukeidx]}</div>

                                {ukedager.map((dag, idx) => {
                                    const sunday = dag.dayjs.isoWeekday() === 7 ? 'sun' : ''
                                    const helg = dag.dayjs.isoWeekday() > 5 ? 'helg' : ''
                                    return (
                                        <div className={`kalenderdag ${dag.tid} ${sunday} ${helg}`} key={idx}>
                                            {dag.tid !== 'foran' && dag.tid !== 'etter'
                                                ?
                                                <>
                                                    <input type="checkbox"
                                                        id={`${sporsmal.id}_${ukeidx}_${idx}`}
                                                        name={`${sporsmal.id}_${ukeidx}_${idx}`}
                                                        value={dag.dayjs.format('YYYY-MM-DD')}
                                                        ref={register}
                                                        checked={lokal.includes(dag.dayjs.format('YYYY-MM-DD'))}
                                                        onChange={() => radioKlikk(dag.dayjs.format(('YYYY-MM-DD')))}
                                                        className="checkboks"
                                                    />
                                                    <label htmlFor={`${sporsmal.id}_${ukeidx}_${idx}`}>
                                                        {dag.dayjs.format('DD')}
                                                    </label>
                                                </>
                                                :
                                                <span className="label">{dag.dayjs.format('DD')}</span>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}

                    <Normaltekst className="kalender__hjelp">
                        {lokal.length === 0
                            ? tekst('sporsmal.egen-bil.kalender.hjelp')
                            : lokal.length === 1
                                ? `${lokal.length} ${tekst('sporsmal.egen-bil.kalender.dagvalgt')}`
                                : `${lokal.length} ${tekst('sporsmal.egen-bil.kalender.dagervalgt')}`
                        }
                    </Normaltekst>

                    <Normaltekst className="kalendervalg">
                        <button type="button" className="lenkeknapp velgalle" onClick={velgAlle}>
                            {tekst('sporsmal.egen-bil.kalender.ukedager')}
                        </button>
                        <button type="button" className="lenkeknapp fjernalle" onClick={fjernAlle}>
                            <img src={SlettIkon} alt="" />
                            {tekst('sporsmal.egen-bil.kalender.fjern')}
                        </button>
                    </Normaltekst>
                </div>
            </div>

            <div role="alert" aria-live="assertive">
                <Vis hvis={errors[sporsmal.id] !== undefined}>
                    <Normaltekst tag="span" className="skjemaelement__feilmelding">
                        <ErrorMessage as="p" errors={errors} name={sporsmal.id} />
                    </Normaltekst>
                </Vis>
            </div>
        </>
    )
}

export default DagerKomp
