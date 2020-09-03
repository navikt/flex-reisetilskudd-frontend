import { Reisetilskudd } from '../../types/reisetilskudd'
import { Periode, Sykmelding, SykmeldingOpplysning } from '../../types/sykmelding'
import env from '../../utils/environment'
import { logger } from '../../utils/logger'

const fåSykmeldingOpplysningSomInterface = (
    response : Sykmelding,
) : SykmeldingOpplysning => {
    return {
        id: response?.id,
        fraDato: response?.mulighetForArbeid?.perioder[0]?.fom,
        tilDato: response?.mulighetForArbeid?.perioder[0]?.tom,
        diagnose: response?.diagnose?.hoveddiagnose?.diagnose,
        diagnosekode: response?.diagnose?.hoveddiagnose.diagnosekode,
        bidiagnoser: response?.diagnose?.bidiagnoser[0]?.diagnose,
        reisetilskudd: response?.mulighetForArbeid?.perioder[0]?.reisetilskudd ? 'Reisetilskudd' : 'Ikke reisetilskudd',
        beskrivHensyn: response?.mulighetForArbeid?.aktivitetIkkeMulig433[0],
        arbeidsgiver: response?.mottakendeArbeidsgiver?.navn,
        sykmelder: response?.bekreftelse?.sykmelder,
        aktivitetIkkeMulig434: response?.mulighetForArbeid?.aktivitetIkkeMulig433[0],
    }
}

export const finnSykmeldingerMedReisetilskudd = (
    response : Sykmelding[],
) : Sykmelding[] => {
    return response.filter((sykmelding: Sykmelding) => {
        const reisetilskuddPerioder = sykmelding?.mulighetForArbeid?.perioder?.filter(
            (
                periode: Periode,
            ) => {
                return periode?.reisetilskudd === true
            })
        return reisetilskuddPerioder.length > 0
    })
}

// TODO: Hent aktiv sykmelding
export const faaRiktigSykmelding = (
    response : Sykmelding[],
) : Sykmelding => response[0]

export const fåSykmeldingIDFraAktivtReisetilskuddID = (aktivtReisetilskuddID: string,
    callback: (s: string) => void) : void => {
    const { apiUrl } = env
    fetch(`${apiUrl}/reisetilskudd`, {
        credentials: 'include',
    })
        .then(
            (response) => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json()
            },
        )
        .then((JSONReisetilskudd) => {
            const riktigReisetilskudd = JSONReisetilskudd.find(
                (
                    sykmelding: Reisetilskudd,
                ) => sykmelding.reisetilskuddId === aktivtReisetilskuddID,
            )
            callback(riktigReisetilskudd.sykmeldingId)
        })
        .catch((err) => logger.error(err))
}

export const hentSykmeldinger = (
    callback : (s : SykmeldingOpplysning[]) => void,
    sykmeldingID: string,
) : void => {
    const { syfoRestSykmeldingerApiUrl } = env
    fetch(syfoRestSykmeldingerApiUrl, {
        credentials: 'include',
    })
        .then(
            (response) => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json()
            },
        )
        .then((response) => finnSykmeldingerMedReisetilskudd(response))
        .then((sykmeldingerMedReisetilskudd) => {
            const riktigSykmelding = sykmeldingerMedReisetilskudd.find(
                (sykmelding) => sykmelding.id === sykmeldingID,
            )
            if (riktigSykmelding) {
                return riktigSykmelding
            }
            throw new Error('Fant ikke sykmelding med riktig ID')
        })
        .then((riktigSykmelding) => fåSykmeldingOpplysningSomInterface(riktigSykmelding))
        .then((parsedOpplysninger : SykmeldingOpplysning) => {
            callback([ parsedOpplysninger ])
        })
        .catch((err) => logger.error(err))
}
