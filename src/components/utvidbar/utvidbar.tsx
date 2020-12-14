import './utvidbar.less'

import Chevron from 'nav-frontend-chevron'
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useEffect, useRef, useState } from 'react'

import { erSynligIViewport } from '../../utils/browser-utils'
import Vis from '../diverse/vis'

interface UtvidbarProps {
    erApen: boolean;
    tittel: React.ReactNode | string;
    systemtittel?: React.ReactNode | string;
    children: React.ReactNode;
    ikon?: string;
    ikonHover?: string;
    ikonAltTekst?: string;
    className?: string;
    visLukk?: boolean;
    type?: 'intern' | 'info' | undefined;
    fixedHeight?: boolean;
}

const Utvidbar = (props: UtvidbarProps) => {
    const [ erApen, setErApen ] = useState<boolean>(props.erApen)
    const [ innholdHeight, setInnholdHeight ] = useState<number>(0)
    const utvidbar = useRef<HTMLDivElement>(null)
    const jsToggle = useRef<HTMLButtonElement>(null)
    const btnImage = useRef<HTMLImageElement>(null)
    const container = useRef<HTMLDivElement>(null)
    const innhold = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setErApen(props.erApen)
        setInnholdHeight(
            props.fixedHeight
                ? 3000
                : innhold.current!.offsetHeight
        )
    }, [ props.erApen, props.fixedHeight ])

    function onTransitionEnd() {
        if (props.type !== undefined) return
        if (erApen) {
            utvidbar.current!.scrollIntoView({ behavior: 'smooth', block: 'center' })
        } else {
            if (!erSynligIViewport(utvidbar.current!)) {
                utvidbar.current!.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
            jsToggle.current!.focus()
        }
    }

    const onButtonClick = () => {
        utvidbar.current!.focus()
        setErApen(!erApen)
    }

    return (
        <div ref={utvidbar} tabIndex={-1}
            className={
                'utvidbar' +
                (props.className ? ' ' + props.className : '') +
                (props.type ? ' ' + props.type : '') +
                (erApen ? ' apen' : '')
            }
        >
            <button aria-expanded={erApen}
                ref={jsToggle}
                onMouseEnter={props.ikon !== undefined ? () => btnImage.current!.src = props.ikonHover! : undefined}
                onMouseLeave={props.ikon !== undefined ? () => btnImage.current!.src = props.ikon! : undefined}
                onClick={onButtonClick}
                type={'button'}
                className="utvidbar__toggle"
            >
                <Vis hvis={props.ikon !== undefined}>
                    <img aria-hidden="true" className="utvidbar__ikon"
                        ref={btnImage}
                        alt={props.ikonAltTekst}
                        src={props.ikon}
                    />
                </Vis>
                <Vis hvis={props.type === undefined}>
                    <div className="utvidbar__tittel">
                        <Systemtittel tag="h3">{props.tittel}</Systemtittel>
                        <Normaltekst className="utvidbar__tekst">{props.systemtittel}</Normaltekst>
                    </div>
                </Vis>
                <Vis hvis={props.type === 'intern'}>
                    <Normaltekst tag="h3" className="utvidbar__tittel">{props.tittel}</Normaltekst>
                </Vis>
                <Vis hvis={props.type === 'info'}>
                    <Normaltekst tag="h3" className="utvidbar__tittel">{props.tittel}</Normaltekst>
                </Vis>
                <span className="utvidbar__handling">
                    <Chevron type={erApen ? 'opp' : 'ned'} />
                </span>
            </button>

            <div ref={container} className={'utvidbar__innholdContainer' + (erApen ? ' apen' : '')}
                onTransitionEnd={() => onTransitionEnd()}
                style={{ maxHeight: erApen ? (innholdHeight * 2) + 'px' : '0' }}
            >
                <div ref={innhold} className="utvidbar__innhold">
                    {props.children}
                    <Vis hvis={props.type === undefined}>
                        <div className="lenkerad">
                            <button type="button" className="lenke" aria-pressed={!erApen}
                                tabIndex={(erApen ? null : -1) as any} onClick={() => setErApen(!erApen)}
                            >
                                <Normaltekst tag="span">
                                    {props.type === 'intern' ? 'Skjul' : 'Lukk'}
                                </Normaltekst>
                            </button>
                        </div>
                    </Vis>
                </div>
            </div>
        </div>
    )
}

export default Utvidbar
