import React from 'react'

import { SykmeldingOpplysning,SykmeldingOpplysningEnum } from '../../types/sykmelding'
import CheckedMedTekst from '../common/checked-med-tekst/checked-med-tekst'

interface Props {
    hvilkenVerdi: SykmeldingOpplysningEnum,
    vårSykmelding: SykmeldingOpplysning | undefined,
}

const VisVerdi = ({ hvilkenVerdi, vårSykmelding }: Props) => (
    (vårSykmelding && vårSykmelding?.[hvilkenVerdi])
        ? <CheckedMedTekst tekst={vårSykmelding?.[hvilkenVerdi]} />
        : <span className="sykmelding-manglende-opplysninger"> - </span>
)

export default VisVerdi
