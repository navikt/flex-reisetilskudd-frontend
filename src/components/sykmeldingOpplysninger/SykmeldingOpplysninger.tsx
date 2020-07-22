/* eslint-disable */
import React, { ReactElement } from 'react';
import './sykmeldingOpplysninger.less';
import { Element } from 'nav-frontend-typografi';
import { useAppStore } from '../../data/stores/app-store';
import Vis from '../Vis';
import { SykmeldingOpplysningInterface } from '../../models/sykmelding';

const SykmeldingOpplysninger = () : ReactElement => {
  const { opplysningerSykmeldinger } = useAppStore();
  // eslint-disable-next-line no-console
  console.log(opplysningerSykmeldinger);

  const tryggHent = (verdi : keyof SykmeldingOpplysningInterface) : any => {
    console.log('tryggHent:', opplysningerSykmeldinger);
    if (opplysningerSykmeldinger !== undefined) {
      const førsteSykmelding = opplysningerSykmeldinger;
      console.log('passerte sjekken');
      // console.log(opplysningerSykmeldinger[verdi])
      console.log(verdi);
      return 'dsdsd';
    }
    return '';
  };

  return (
    <div>
      <Element>Periode</Element>
      {tryggHent('fraDato')}
      {' '}
      -
      {tryggHent('tilDato')}
      <Element>Diagnose</Element>
      {tryggHent('diagnose')}
      <Element>Bidiagnose</Element>
      {tryggHent('bidiagnose')}
      <Element>Beskriv fraværet</Element>
      {tryggHent('beskrivFraver')}
      <Element>Beskriv eventelle hesyn som må tas på arbeidsplassen</Element>
      {tryggHent('beskrivHensyn')}
      <Element>Arbeidsgiver som legen har skrevet inn</Element>
      {tryggHent('arbeidsgiver')}
      <Element>Lege/sykmelder</Element>
      {tryggHent('sykmelder')}
    </div>
  );
};

export default SykmeldingOpplysninger;
