import React, { ReactElement } from 'react';
import './sykmeldingOpplysninger.less';
import { Element } from 'nav-frontend-typografi';
import { useAppStore } from '../../data/stores/app-store';
import Vis from '../Vis';
import { SykmeldingOpplysningEnum } from '../../models/sykmelding';

const SykmeldingOpplysninger = () : ReactElement => {
  const { opplysningerSykmeldinger } = useAppStore();
  const vårSykmelding = opplysningerSykmeldinger ? opplysningerSykmeldinger[0] : undefined;

  return (
    <div>
      <Vis hvis={vårSykmelding !== undefined}>
        <Element>Periode</Element>
        {vårSykmelding ? vårSykmelding[SykmeldingOpplysningEnum.FRA_DATO] : ''}
        {' '}
        -
        {vårSykmelding ? vårSykmelding[SykmeldingOpplysningEnum.TIL_DATO] : ''}
        <Element>Diagnose</Element>
        {vårSykmelding ? vårSykmelding[SykmeldingOpplysningEnum.DIAGNOSE] : ''}
        <Element>Bidiagnose</Element>
        {vårSykmelding ? vårSykmelding[SykmeldingOpplysningEnum.BI_DIAGNOSE] : ''}
        <Element>Beskriv fraværet</Element>
        {vårSykmelding ? vårSykmelding[SykmeldingOpplysningEnum.BESKRIV_FRAVÆR] : ''}
        <Element>Beskriv eventelle hesyn som må tas på arbeidsplassen</Element>
        {vårSykmelding ? vårSykmelding[SykmeldingOpplysningEnum.BESKRIV_HENSYN] : ''}
        <Element>Arbeidsgiver som legen har skrevet inn</Element>
        {vårSykmelding ? vårSykmelding[SykmeldingOpplysningEnum.ARBEIDSGIVER] : ''}
        <Element>Lege/sykmelder</Element>
        {vårSykmelding ? vårSykmelding[SykmeldingOpplysningEnum.SYKMELDER] : ''}
      </Vis>
    </div>
  );
};

export default SykmeldingOpplysninger;
