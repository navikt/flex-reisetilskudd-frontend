import React from 'react'

import { SykmeldingOpplysningEnum, SykmeldingOpplysningInterface } from '../../models/sykmelding'
import CheckedMedTekst from '../common/checked-med-tekst/checked-med-tekst'

interface Props {
    hvilkenVerdi: SykmeldingOpplysningEnum,
    vårSykmelding: SykmeldingOpplysningInterface | undefined,
}

const VisVerdi = ({ hvilkenVerdi, vårSykmelding }: Props) => (
    (vårSykmelding && vårSykmelding?.[hvilkenVerdi])
        ? <CheckedMedTekst tekst={vårSykmelding?.[hvilkenVerdi]} />
        : <span className="sykmelding-manglende-opplysninger"> - </span>
)

export default VisVerdi
