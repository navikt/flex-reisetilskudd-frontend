import React, { ReactElement } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

interface Props {
  tekst: string;
}
const CheckedMedTekst = ({ tekst } : Props) : ReactElement => (
  <Normaltekst className="checked-med-tekst">
    {tekst}
  </Normaltekst>
);

export default CheckedMedTekst;
