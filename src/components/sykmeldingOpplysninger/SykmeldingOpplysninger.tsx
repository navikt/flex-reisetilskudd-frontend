import React, { ReactElement } from 'react';
import './sykmeldingOpplysninger.less';
import { Element } from 'nav-frontend-typografi';
import { useAppStore } from '../../data/stores/app-store';
import Vis from '../Vis';

const SykmeldingOpplysninger = () : ReactElement => {
  const { opplysningerSykmeldinger } = useAppStore();
  const vårSykmelding = opplysningerSykmeldinger ? opplysningerSykmeldinger[0] : undefined;

  return (
    <div>
      <Vis hvis={opplysningerSykmeldinger !== undefined && opplysningerSykmeldinger.length > 0}>
        <Element>Periode</Element>
        {vårSykmelding ? vårSykmelding.fraDato : ''}
        {' '}
        -
        {vårSykmelding ? vårSykmelding.tilDato : ''}
        <Element>Diagnose</Element>
        {vårSykmelding ? vårSykmelding.diagnose : ''}
        <Element>Bidiagnose</Element>
        {vårSykmelding ? vårSykmelding.bidiagnose : ''}
        <Element>Beskriv fraværet</Element>
        {vårSykmelding ? vårSykmelding.beskrivFraver : ''}
        <Element>Beskriv eventelle hesyn som må tas på arbeidsplassen</Element>
        {vårSykmelding ? vårSykmelding.beskrivHensyn : ''}
        <Element>Arbeidsgiver som legen har skrevet inn</Element>
        {vårSykmelding ? vårSykmelding.arbeidsgiver : ''}
        <Element>Lege/sykmelder</Element>
        {vårSykmelding ? vårSykmelding.sykmelder : ''}
      </Vis>
    </div>
  );
};

export default SykmeldingOpplysninger;
