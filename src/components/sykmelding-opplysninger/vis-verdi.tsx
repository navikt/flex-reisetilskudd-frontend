import React from 'react'

import { SykmeldingOpplysningEnum, SykmeldingOpplysningInterface } from '../../models/sykmelding'
import CheckedMedTekst from '../common/checked-med-tekst/checked-med-tekst'
import ManglendeOpplysninger from './manglende-opplysninger'

interface Props {
    hvilkenVerdi: SykmeldingOpplysningEnum,
    vårSykmelding: SykmeldingOpplysningInterface | undefined,
}

const VisVerdi = ({ hvilkenVerdi, vårSykmelding }: Props) => (
    (vårSykmelding && vårSykmelding?.[hvilkenVerdi])
        ? <CheckedMedTekst tekst={vårSykmelding?.[hvilkenVerdi]} />
        : <ManglendeOpplysninger />
)

export default VisVerdi
