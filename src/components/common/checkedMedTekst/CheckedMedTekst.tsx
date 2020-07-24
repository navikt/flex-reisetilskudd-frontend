import React, { ReactElement } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { CheckedIkon } from '../../../assets/ikoner';
import './CheckedMedTekst.less';

interface Props {
  tekst: string;
}
const CheckedMedTekst = ({ tekst } : Props) : ReactElement => (
  <Normaltekst className="checked-med-tekst">
    <CheckedIkon />
    {tekst}
  </Normaltekst>
);

export default CheckedMedTekst;
