import React, { ReactElement } from 'react';
import './sykmeldingOpplysninger.less';
import { Element } from 'nav-frontend-typografi';
import { useAppStore } from '../../data/stores/app-store';

const SykmeldingOpplysninger = () : ReactElement => {
  const { opplysningerSykmeldinger, midlertidigOpplysningerSykmeldinger } = useAppStore();
  // eslint-disable-next-line no-console
  console.log(midlertidigOpplysningerSykmeldinger);

  return (
    <div>
      <Element>Periode</Element>
      {opplysningerSykmeldinger[0].fraDato}
      {' '}
      -
      {opplysningerSykmeldinger[0].tilDato}
      <Element>Diagnose</Element>
      {opplysningerSykmeldinger[0].diagnose}
      <Element>Bidiagnose</Element>
      {opplysningerSykmeldinger[0].bidiagnose}
      <Element>Beskriv fraværet</Element>
      {opplysningerSykmeldinger[0].beskrivFraver}
      <Element>Beskriv eventelle hesyn som må tas på arbeidsplassen</Element>
      {opplysningerSykmeldinger[0].beskrivHensyn}
      <Element>Arbeidsgiver som legen har skrevet inn</Element>
      {opplysningerSykmeldinger[0].arbeidsgiver}
      <Element>Lege/sykmelder</Element>
      {opplysningerSykmeldinger[0].sykmelder}
    </div>
  );
};

export default SykmeldingOpplysninger;
