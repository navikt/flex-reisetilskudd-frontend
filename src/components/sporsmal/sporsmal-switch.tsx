import './undersporsmal/undersporsmal.less'

import React from 'react'

import { Sporsmal, Svartype } from '../../types/types'
import CheckboxKomp from './typer/checkbox-komp'
import CheckboxPanel from './typer/checkbox-panel'
import JaNeiInput from './typer/ja-nei-input'
import JaNeiRadio from './typer/ja-nei-radio'
import UkjentSporsmal from './typer/ukjent-sporsmal'
import TallInput from './typer/tall-komp'
import Kvittering from './kvittering/kvittering'
import DagerKomp from './typer/dager-komp'

interface UndersporsmalProps {
    sporsmal: Sporsmal;
}

const SporsmalSwitch = ({ sporsmal }: UndersporsmalProps) => {
    switch (sporsmal.svartype) {
        case Svartype.CHECKBOX_PANEL:
            return <CheckboxPanel sporsmal={sporsmal} />

        case Svartype.CHECKBOX:
        case Svartype.CHECKBOX_GRUPPE:
            return <CheckboxKomp sporsmal={sporsmal} />

        case Svartype.JA_NEI:
            if (!sporsmal.erHovedsporsmal &&
                (sporsmal.parentKriterie === 'CHECKED'
                    || sporsmal.parentKriterie === 'JA'
                    || sporsmal.undersporsmal.length === 0)
            ) {
                return <JaNeiRadio sporsmal={sporsmal} />
            }
            return <JaNeiInput sporsmal={sporsmal} />

        case Svartype.DATOER:
            return <DagerKomp sporsmal={sporsmal} />

        case Svartype.BELOP:
        case Svartype.KILOMETER:
            return <TallInput sporsmal={sporsmal} />

        case Svartype.KVITTERING:
            return <Kvittering sporsmal={sporsmal} />

        default:
            return <UkjentSporsmal sporsmal={sporsmal} />
    }
}

export default SporsmalSwitch
