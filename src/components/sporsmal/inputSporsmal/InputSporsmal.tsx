import React, { ReactElement } from 'react';
import { Input } from 'nav-frontend-skjema';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { InputProps } from '../../../types/types';
import './input-sporsmal.less';
import { antallKilometerSpørsmål, månedligeUtgifterSpørsmål } from '../spørsmålTekster';
import Vis from '../../Vis';
import { hjelpetekstEgenBil, hjelpetekstKollektivtransport } from '../../../constants/hjelpetekster';

const InputSporsmal = ({
  tittel, inputMode, bredde, value, onChange, id, feil,
}: InputProps): ReactElement => (
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
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
        id={id}
        feil={feil}
      />
    </div>
  </div>
);

export default InputSporsmal;
