import './input-sporsmal.less'

import Hjelpetekst from 'nav-frontend-hjelpetekst'
import { Input } from 'nav-frontend-skjema'
import React from 'react'

import { hjelpetekstEgenBil, hjelpetekstKollektivtransport } from '../../../constants/hjelpetekster'
import { InputProps } from '../../../types/sporsmal'
import Vis from '../../vis'
import { antallKilometerSpørsmål, månedligeUtgifterSpørsmål } from '../sporsmal-tekster'

const InputSporsmal = ({ tittel, inputMode, bredde, value, onChange, id, feil }: InputProps) => (
    <div className="input-tittel">
        <div className="input-felt-wrapper">
            <Input
                label={(
                    <div style={{ display: 'flex' }}>
                        {tittel}
                        <Vis
                            hvis={id === antallKilometerSpørsmål.id}
                        >
                            <Hjelpetekst className="transportmiddel-kilometer-hjelpetekst">
                                {hjelpetekstEgenBil.hjelpetekst}
                            </Hjelpetekst>
                        </Vis>
                        <Vis
                            hvis={id === månedligeUtgifterSpørsmål.id}
                        >
                            <Hjelpetekst className="månedlige-utgifter-hjelpetekst">
                                {hjelpetekstKollektivtransport.hjelpetekst}
                            </Hjelpetekst>
                        </Vis>
                    </div>
                )}
                className="input-felt"
                inputMode={inputMode}
                pattern="[0-9]*"
                bredde={bredde}
                value={value}
                onChange={(e) => onChange!(e.target.value)}
                id={id}
                feil={feil}
            />
        </div>
    </div>
)

export default InputSporsmal
