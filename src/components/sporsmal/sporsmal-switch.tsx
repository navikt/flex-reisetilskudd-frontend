import './undersporsmal/undersporsmal.less'

import React from 'react'

import { RSSvartype } from '../../types/rs-types/rs-svartype'
import { Sporsmal } from '../../types/types'
import CheckboxKomp from './typer/checkbox-komp'
import CheckboxPanel from './typer/checkbox-panel'
import JaNeiInput from './typer/ja-nei-input'
import JaNeiRadio from './typer/ja-nei-radio'
import UkjentSporsmal from './typer/ukjent-sporsmal'
import DatoInput from './typer/dato-komp'
import TallInput from './typer/tall-komp'

interface UndersporsmalProps {
    sporsmal: Sporsmal;
}

const SporsmalSwitch = ({ sporsmal }: UndersporsmalProps) => {
    switch (sporsmal.svartype) {
        case RSSvartype.CHECKBOX_PANEL:
            return <CheckboxPanel sporsmal={sporsmal} />

        case RSSvartype.CHECKBOX:
        case RSSvartype.CHECKBOX_GRUPPE:
            return <CheckboxKomp sporsmal={sporsmal} />

        case RSSvartype.JA_NEI:
            if (!sporsmal.erHovedsporsmal &&
                (sporsmal.parentKriterie === 'CHECKED'
                    || sporsmal.parentKriterie === 'JA'
                    || sporsmal.undersporsmal.length === 0)
            ) {
                return <JaNeiRadio sporsmal={sporsmal} />
            }
            return <JaNeiInput sporsmal={sporsmal} />

        case RSSvartype.DATOER:
            return <DatoInput sporsmal={sporsmal} />

        case RSSvartype.BELOP:
        case RSSvartype.KILOMETER:
            return <TallInput sporsmal={sporsmal} />

        case RSSvartype.KVITTERING:
            return null

        default:
            return <UkjentSporsmal sporsmal={sporsmal} />
    }
}

export default SporsmalSwitch
