import React, { ReactElement } from 'react';
import { SykmeldingOpplysningEnum, SykmeldingOpplysningInterface } from '../../models/sykmelding';
import ManglendeOpplysninger from './ManglendeOpplysninger';
import CheckedMedTekst from '../common/checkedMedTekst/CheckedMedTekst';

interface Props {
  hvilkenVerdi : SykmeldingOpplysningEnum,
  vårSykmelding: SykmeldingOpplysningInterface,
}

const VisVerdi = ({ hvilkenVerdi, vårSykmelding } : Props) : ReactElement => (
    vårSykmelding?.[hvilkenVerdi]
      ? <CheckedMedTekst tekst={vårSykmelding?.[hvilkenVerdi]} />
      : <ManglendeOpplysninger />
);

export default VisVerdi;
