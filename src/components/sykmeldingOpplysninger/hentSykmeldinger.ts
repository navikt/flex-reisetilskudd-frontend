// eslint-disable-next-line max-len
/* eslint-disable @typescript-eslint/no-explicit-any, import/prefer-default-export, @typescript-eslint/explicit-module-boundary-types */
import { SykmeldingOpplysningInterface } from '../../models/sykmelding';
import { logger } from '../../utils/logger';

const fåSykmeldingOpplysningInterface = (response : any) : SykmeldingOpplysningInterface => {
  const sykmeldingOpplysninger = {
    fraDato: response?.mulighetForArbeid?.perioder[0]?.fom,
    tilDato: response?.mulighetForArbeid?.perioder[0]?.tom,
    diagnose: response?.diagnose?.hoveddiagnose?.diagnose,
    bidiagnose: 'ADHD',
    beskrivFraver: response?.mulighetForArbeid?.perioder[0]?.reisetilskudd ? 'Reisetilskudd' : 'Ikke reisetilskudd',
    beskrivHensyn: 'Må ha eget toalett på jobb',
    arbeidsgiver: response?.mottakendeArbeidsgiver?.navn,
    sykmelder: response?.bekreftelse?.sykmelder,
    aktivitetIkkeMulig434: 'a',
  };

  return sykmeldingOpplysninger;
};

export const finnSykmeldingerMedReisetilskudd = (response : any) => {
  const filtrerteSykmeldinger = response.filter((sykmelding : any) => {
    const reisetilskuddPerioder = sykmelding?.mulighetForArbeid?.perioder?.filter(
      (
        periode : any,
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
export const faaRiktigSykmelding = (response : any) => response[0];

export const hentSykmeldinger = (settOpplysningerSykmeldinger : any) => {
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
    .then((sykmeldingerMedReisetilskudd) => faaRiktigSykmelding(sykmeldingerMedReisetilskudd))
    .then((riktigSykmelding) => fåSykmeldingOpplysningInterface(riktigSykmelding))
    .then((parsedOpplysninger : SykmeldingOpplysningInterface) => {
      settOpplysningerSykmeldinger([parsedOpplysninger]);
    })
    .catch((err) => logger.error(err));
};
