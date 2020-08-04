import { SykmeldingOpplysningInterface, Periode, Sykmelding } from '../../models/sykmelding';
import { logger } from '../../utils/logger';
import env from '../../utils/environment';
import { ReisetilskuddInterface } from '../../models/reisetilskudd';

const fåSykmeldingOpplysningSomInterface = (
  response : Sykmelding,
) : SykmeldingOpplysningInterface => {
  const sykmeldingOpplysninger = {
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
  };

  return sykmeldingOpplysninger;
};

export const finnSykmeldingerMedReisetilskudd = (
  response : Sykmelding[],
) : Sykmelding[] => {
  const filtrerteSykmeldinger = response.filter((sykmelding : Sykmelding) => {
    const reisetilskuddPerioder = sykmelding?.mulighetForArbeid?.perioder?.filter(
      (
        periode : Periode,
      ) => {
        if (periode?.reisetilskudd === true) {
          return true;
        }

        return false;
      });
    return reisetilskuddPerioder.length > 0;
  });
  return filtrerteSykmeldinger;
};

// TODO: Hent aktiv sykmelding
export const faaRiktigSykmelding = (
  response : Sykmelding[],
) : Sykmelding => response[0];

export const fåSykmeldingIDFraAktivtReisetilskuddID = (aktivtReisetilskuddID: string,
  callback: (s: string) => void) : void => {
  const { apiUrl } = env;
  fetch(`${apiUrl}/reisetilskudd`, {
    credentials: 'include',
  })
    .then(
      (response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      },
    )
    .then((JSONReisetilskudd) => {
      const riktigReisetilskudd = JSONReisetilskudd.find(
        (
          sykmelding: ReisetilskuddInterface,
        ) => sykmelding.reisetilskuddId === aktivtReisetilskuddID,
      );
      callback(riktigReisetilskudd.sykmeldingId);
    })
    .catch((err) => logger.error(err));
};

export const hentSykmeldinger = (
  callback : (s : SykmeldingOpplysningInterface[]) => void,
  sykmeldingID: string,
) : void => {
  // TODO: Denne URL-en må defineres via env:
  fetch('http://localhost:1993/syforest/sykmeldinger', {
    credentials: 'include',
  })
    .then(
      (response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      },
    )
    .then((response) => finnSykmeldingerMedReisetilskudd(response))
    .then((sykmeldingerMedReisetilskudd) => {
      const riktigSykmelding = sykmeldingerMedReisetilskudd.find(
        (sykmelding) => sykmelding.id === sykmeldingID,
      );
      if (riktigSykmelding) {
        return riktigSykmelding;
      }
      throw new Error('Fant ikke sykmelding med riktig ID');
    })
    .then((riktigSykmelding) => fåSykmeldingOpplysningSomInterface(riktigSykmelding))
    .then((parsedOpplysninger : SykmeldingOpplysningInterface) => {
      callback([parsedOpplysninger]);
    })
    .catch((err) => logger.error(err));
};
