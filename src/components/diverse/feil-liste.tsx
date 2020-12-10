import 'nav-frontend-skjema-style'

import classnames from 'classnames'
import Lenke from 'nav-frontend-lenker'
import { Undertittel } from 'nav-frontend-typografi'
import React from 'react'

export interface FeiloppsummeringProps
    extends React.HTMLAttributes<HTMLDivElement> {
    className?: string
    innerRef?: React.RefObject<HTMLDivElement>
    tittel: React.ReactNode
    feil: FeiloppsummeringFeil[]
    // eslint-disable-next-line no-unused-vars
    customFeilRender?: (feil: FeiloppsummeringFeil) => React.ReactNode
}

export interface FeiloppsummeringFeil {
    skjemaelementId: string
    feilmelding: string
}

function goToDatePicker(e: any, inputId: string) {
    e.preventDefault()
    if (inputId === 'filopplaster-dato-input') {
        const hidden = document.getElementById(inputId)
        if (hidden!.getAttribute('type') === 'hidden') {
            const input: HTMLInputElement | null = hidden!.parentElement!.querySelector('input[type=text]')
            input!.focus()
        }
    }
}

class FeilListe
    extends React.Component<FeiloppsummeringProps> {

    render() {
        const {
            className,
            innerRef,
            tittel,
            feil,
            customFeilRender,
            ...rest
        } = this.props
        return (
            <div
                ref={innerRef}
                tabIndex={0}
                role="region"
                className={classnames('feiloppsummering', className)}
                {...rest}
            >
                {typeof tittel === 'string' ? (
                    <Undertittel>{tittel}</Undertittel>
                ) : (
                    tittel
                )}
                <ul className="feiloppsummering__liste">
                    {feil.map((item) => (
                        <li key={item.skjemaelementId}>
                            {customFeilRender ? (
                                customFeilRender(item)
                            ) : (
                                item.skjemaelementId === 'filopplaster-dato-input'
                                    ?
                                    <a href={`#${item.skjemaelementId}`} className="lenke"
                                        onClick={(e) => goToDatePicker(e, item.skjemaelementId)}
                                    >
                                        {item.feilmelding}
                                    </a>
                                    :
                                    <Lenke href={`#${item.skjemaelementId}`}>
                                        {item.feilmelding}
                                    </Lenke>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default FeilListe
