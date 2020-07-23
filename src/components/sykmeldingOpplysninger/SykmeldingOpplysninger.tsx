import React, { ReactElement } from 'react';
import './sykmeldingOpplysninger.less';
import { Element, Normaltekst } from 'nav-frontend-typografi';
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
        {vårSykmelding?.[SykmeldingOpplysningEnum.FRA_DATO]}
        {' '}
        -
        {vårSykmelding?.[SykmeldingOpplysningEnum.TIL_DATO]}
        <Element>Diagnose</Element>
        {vårSykmelding?.[SykmeldingOpplysningEnum.DIAGNOSE]}
        <Vis hvis={vårSykmelding?.[SykmeldingOpplysningEnum.BI_DIAGNOSE]}>
          <Element>Bidiagnose</Element>
          {vårSykmelding?.[SykmeldingOpplysningEnum.BI_DIAGNOSE]}
        </Vis>
        <Element>Beskrivelse av fraværet</Element>
        {vårSykmelding?.[SykmeldingOpplysningEnum.BESKRIV_FRAVÆR]}
        <Element>Beskriv eventelle hesyn som må tas på arbeidsplassen</Element>
        {vårSykmelding?.[SykmeldingOpplysningEnum.BESKRIV_HENSYN]}
        <Element>Arbeidsgiver som legen har skrevet inn</Element>
        {vårSykmelding?.[SykmeldingOpplysningEnum.ARBEIDSGIVER]}
        <Element>Lege/sykmelder</Element>
        {vårSykmelding?.[SykmeldingOpplysningEnum.SYKMELDER]}
      </Vis>
      <Vis hvis={vårSykmelding === undefined}>
        <Normaltekst>
          Vi kunne dessverre ikke hente opplysninger fra sykmeldingen din, prøv igjen senere
        </Normaltekst>
      </Vis>
    </div>
  );
};

export default SykmeldingOpplysninger;
