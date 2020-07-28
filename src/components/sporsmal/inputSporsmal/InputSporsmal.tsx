import { Element } from 'nav-frontend-typografi';
import React, { ReactElement } from 'react';
import { Input } from 'nav-frontend-skjema';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { InputProps } from '../../../types/types';
import './input-sporsmal.less';
import Vis from '../../Vis';

const InputSporsmal = ({
  tittel, inputMode, bredde, value, onChange, id, feil,
}: InputProps): ReactElement => (
  <div className="månedlige-utgifter-spørsmål">
    <Element>
      {tittel}
    </Element>
    <div className="månedlige-utgifter-input">
      <Input
        inputMode={inputMode}
        pattern="[0-9]*"
        bredde={bredde}
        value={value}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
        id={id}
        feil={feil}
      />
      <Vis
        hvis={id === 'dagens-transportmiddel-kilometer-input'}
      >
        <Hjelpetekst className="transportmiddel-kilometer-hjelpetekst">
          Dette er en hjelpetekst for antall kilometer fra bosted til arbeid.
        </Hjelpetekst>
      </Vis>
      <Vis
        hvis={id === 'dagens-transportmiddel-månedlige-utgifter-input'}
      >
        <Hjelpetekst className="månedlige-utgifter-hjelpetekst">
          Dette er en hjelpetekst for månedlige utgifter.
        </Hjelpetekst>
      </Vis>
    </div>
  </div>
);

export default InputSporsmal;
