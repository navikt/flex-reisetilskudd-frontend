/* eslint-disable */
// TODO: Fjern eslint-disable

import { SykmeldingOpplysningInterface } from "../../models/sykmelding";

const fåSykmeldingOpplysningInterface = (response : any) : SykmeldingOpplysningInterface => {
  const sykmeldingOpplysninger = {
    fraDato: response.mulighetForArbeid.perioder[0].fom,
    tilDato: response.mulighetForArbeid.perioder[0].tom,
    diagnose: response.diagnose.hoveddiagnose.diagnose,
    bidiagnose: 'ADHD',
    beskrivFraver: response.mulighetForArbeid.perioder[0].reisetilskudd ? 'Reisetilskudd' : 'Ikke reisetilskudd',
    beskrivHensyn: 'Må ha eget toalett på jobb',
    arbeidsgiver: response.mottakendeArbeidsgiver.navn,
    sykmelder: response.bekreftelse.sykmelder,
    aktivitetIkkeMulig434: 'a',
  };

  console.log(sykmeldingOpplysninger);
  console.log(response.mulighetForArbeid.perioder[0].fom);
  return sykmeldingOpplysninger
};

export const hentSykmeldinger = (settOpplysningerSykmeldinger : any) => {
  fetch('http://localhost:1993/syforest/sykmeldinger', {
    credentials: 'include',
  })
    .then(
      (response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        console.log(response);
        return response.json();
      },
    )
    .then((response) => {
      console.log(response);
      settOpplysningerSykmeldinger([fåSykmeldingOpplysningInterface(response[0])]);
    });
};
