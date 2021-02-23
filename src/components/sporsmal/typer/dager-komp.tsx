import './dager-komp.less'

import { ErrorMessage } from '@hookform/error-message'
import dayjs, { Dayjs } from 'dayjs'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { RSSvarliste } from '../../../types/rs-types/rs-svarliste'
import Vis from '../../diverse/vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { Sporsmal } from '../../../types/types'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isoWeek from 'dayjs/plugin/isoWeek'
import { mnd_stor_forbokstav, sammeAar, sammeMnd } from '../../../utils/dato'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { useAppStore } from '../../../data/stores/app-store'

dayjs.extend(weekOfYear)
dayjs.extend(isoWeek)

interface KalenderDag {
    dayjs: Dayjs;
    tid: 'foran' | 'etter' | 'inni';
}

const DagerKomp = ({ sporsmal }: SpmProps) => {
    const { setErBekreftet } = useAppStore()
    const [ lokal, setLokal ] = useState<string[]>([])
    const { register, errors, setValue } = useFormContext()

    const dagerSidenMandag = (spm: Sporsmal) => {
        return ((dayjs(spm.min!).day() - 1)) % 7
    }

    const dagerTilFredag = (spm: Sporsmal) => {
        return (5 - dayjs(spm.max!).day())
    }

    const kalTittel = () => {
        const firstYear = sammeAar(sporsmal) ? '' : dayjs(sporsmal.min!).year().toString()
        const lastYear = dayjs(sporsmal.max!).year().toString()
        const firstMonth = dayjs(sporsmal.min!).month()
        const lastMonth = dayjs(sporsmal.max!).month()
        return sammeMnd(sporsmal)
            ? `${mnd_stor_forbokstav[firstMonth]} ${firstYear}`
            : `${mnd_stor_forbokstav[firstMonth]} ${firstYear} - ${mnd_stor_forbokstav[lastMonth]} ${lastYear}`
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
            for (let i = 0; i < post; i++) {
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
        setLokal(new Array(uker.length).fill(''))
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const lagret: RSSvarliste[] = [] // hentSvar(sporsmal)
        lagret.forEach((liste, idx) => {
            const svar: any = liste.svar[0]
            if (svar !== undefined && svar.verdi !== 'Ikke til behandling') {
                lokal[idx] = svar.verdi
                const radio = document.querySelector('.radioknapp[value="' + lokal[idx] + '"]')
                radio!.setAttribute('checked', 'checked')
            }
        })
        setLokal(lokal)

        // eslint-disable-next-line
    }, [ sporsmal ])

    const radioKlikk = (value: string, name: string) => {
        const index = lokal.indexOf(value)
        if (index > -1) {
            lokal.splice(index, 1)
        } else {
            lokal.push(value)
        }
        setLokal(Array.from(new Set(lokal)))
        setValue(name, lokal)
        setErBekreftet(lokal.length > 0)
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
                                                        name={sporsmal.id}
                                                        value={dag.dayjs.format('YYYY-MM-DD')}
                                                        ref={register}
                                                        onChange={() => radioKlikk(dag.dayjs.format(('YYYY-MM-DD')), sporsmal.id)}
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
                        {getLedetekst(tekst('sporsmal.egen-bil.kalender.hjelp'), {
                            '%FRA%': sammeAar(sporsmal)
                                ? dayjs(sporsmal.min!).format('DD. MMMM')
                                : dayjs(sporsmal.min!).format('DD. MMMM YYYY'),
                            '%TIL%': dayjs(sporsmal.max!).format('DD. MMMM YYYY')
                        })}
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
