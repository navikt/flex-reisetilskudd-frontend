import React, { ReactElement } from 'react';
import { SykmeldingOpplysningEnum, SykmeldingOpplysningInterface } from '../../models/sykmelding';
import ManglendeOpplysninger from './ManglendeOpplysninger';
import CheckedMedTekst from '../common/checkedMedTekst/CheckedMedTekst';

interface Props {
  hvilkenVerdi : SykmeldingOpplysningEnum,
  vårSykmelding: SykmeldingOpplysningInterface | undefined,
}

const VisVerdi = ({ hvilkenVerdi, vårSykmelding } : Props) : ReactElement => (
  (vårSykmelding && vårSykmelding?.[hvilkenVerdi])
    ? <CheckedMedTekst tekst={vårSykmelding?.[hvilkenVerdi]} />
    : <ManglendeOpplysninger />
);

export default VisVerdi;
