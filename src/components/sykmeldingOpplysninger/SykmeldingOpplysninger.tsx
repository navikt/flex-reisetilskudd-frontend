import React, { ReactElement } from 'react';
import './sykmeldingOpplysninger.less';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { useAppStore } from '../../data/stores/app-store';
import Vis from '../Vis';
import { SykmeldingOpplysningEnum } from '../../models/sykmelding';
import ManglendeOpplysninger from './ManglendeOpplysninger';
import PeriodeTekst from './PeriodeTekst';

const SykmeldingOpplysninger = () : ReactElement => {
  const { opplysningerSykmeldinger } = useAppStore();
  const vårSykmelding = opplysningerSykmeldinger ? opplysningerSykmeldinger[0] : undefined;

  const fåVerdiEllerManglendeOpplysninger = (
    hvilkenVerdi : SykmeldingOpplysningEnum,
  ) => vårSykmelding?.[hvilkenVerdi] || <ManglendeOpplysninger />;

  const fraDato : string = vårSykmelding?.[SykmeldingOpplysningEnum.FRA_DATO] || '';
  const tilDato : string = vårSykmelding?.[SykmeldingOpplysningEnum.TIL_DATO] || '';

  return (
    <div className="sykmelding-opplysninger-wrapper">
      <Vis hvis={vårSykmelding !== undefined}>
        <Element className="soknad-tittel">Periode</Element>
        <PeriodeTekst fraDato={fraDato} tilDato={tilDato} />
        <Element className="soknad-tittel">Diagnose</Element>
        {fåVerdiEllerManglendeOpplysninger(SykmeldingOpplysningEnum.DIAGNOSE)}
        <Element className="soknad-tittel">Bidiagnose</Element>
        {fåVerdiEllerManglendeOpplysninger(SykmeldingOpplysningEnum.BI_DIAGNOSER)}
        <Element className="soknad-tittel">Reisetilskudd</Element>
        {fåVerdiEllerManglendeOpplysninger(SykmeldingOpplysningEnum.REISETILSKUDD)}
        <Element className="soknad-tittel">Beskriv eventelle hesyn som må tas på arbeidsplassen</Element>
        {fåVerdiEllerManglendeOpplysninger(SykmeldingOpplysningEnum.BESKRIV_HENSYN)}
        <Element className="soknad-tittel">Arbeidsgiver som legen har skrevet inn</Element>
        {fåVerdiEllerManglendeOpplysninger(SykmeldingOpplysningEnum.ARBEIDSGIVER)}
        <Element className="soknad-tittel">Lege/sykmelder</Element>
        {fåVerdiEllerManglendeOpplysninger(SykmeldingOpplysningEnum.SYKMELDER)}
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
