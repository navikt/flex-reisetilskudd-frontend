/* eslint-disable */
// TODO: Fjern eslint-disable

const fåSykmeldingOpplysningInterface = (response : any) => {
  const sykmeldingOpplysninger = {
    fraDato: response.mulighetForArbeid.perioder[0].fom,
    tilDato: response.mulighetForArbeid.perioder[0].tom,
    diagnose: response.diagnose.hoveddiagnose.diagnose,
    bidiagnose: 'ADHD',
    beskrivFraver: response.mulighetForArbeid.perioder[0].reisetilskudd ? 'Reisetilskudd' : 'Ikke reisetilskudd',
    beskrivHensyn: 'Må ha eget toalett på jobb',
    arbeidsgiver: response.mottakendeArbeidsgiver.navn,
    sykmelder: response.bekreftelse.sykmelder,
  };

  console.log(sykmeldingOpplysninger);
  console.log(response.mulighetForArbeid.perioder[0].fom);
};

export const hentSykmeldinger = (settMidlertidigOpplysningerSykmeldinger : any) => {
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
    .then((response) => {
      console.log(response);
      fåSykmeldingOpplysningInterface(response[0]);
      settMidlertidigOpplysningerSykmeldinger(response);
    });
};
