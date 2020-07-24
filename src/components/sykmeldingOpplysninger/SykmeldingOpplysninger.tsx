import React, { ReactElement } from 'react';
import './sykmeldingOpplysninger.less';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { useAppStore } from '../../data/stores/app-store';
import Vis from '../Vis';
import { SykmeldingOpplysningEnum } from '../../models/sykmelding';
import PeriodeTekst from './PeriodeTekst';
import VisVerdi from './VisVerdi';

const SykmeldingOpplysninger = () : ReactElement => {
  const { opplysningerSykmeldinger } = useAppStore();
  const vårSykmelding = opplysningerSykmeldinger ? opplysningerSykmeldinger[0] : undefined;

  const fraDato : string = vårSykmelding?.[SykmeldingOpplysningEnum.FRA_DATO] || '';
  const tilDato : string = vårSykmelding?.[SykmeldingOpplysningEnum.TIL_DATO] || '';

  const tittelKlasseNavn = 'soknad-tittel';

  const visVårVerdi = (hvilkenVerdi : SykmeldingOpplysningEnum) => (
    <VisVerdi hvilkenVerdi={hvilkenVerdi} vårSykmelding={vårSykmelding} />
  );

  return (
    <div className="sykmelding-opplysninger-wrapper">
      <Vis hvis={vårSykmelding !== undefined}>
        <Element className={tittelKlasseNavn}>Periode</Element>
        <PeriodeTekst fraDato={fraDato} tilDato={tilDato} />
        <Element className={tittelKlasseNavn}>Diagnose</Element>
        {visVårVerdi(SykmeldingOpplysningEnum.DIAGNOSE)}
        <Element className={tittelKlasseNavn}>Bidiagnose</Element>
        {visVårVerdi(SykmeldingOpplysningEnum.BI_DIAGNOSER)}
        <Element className={tittelKlasseNavn}>Reisetilskudd</Element>
        {visVårVerdi(SykmeldingOpplysningEnum.REISETILSKUDD)}
        <Element className={tittelKlasseNavn}>
          Beskriv eventelle hesyn som må tas på arbeidsplassen
        </Element>
        {visVårVerdi(SykmeldingOpplysningEnum.BESKRIV_HENSYN)}
        <Element className={tittelKlasseNavn}>Arbeidsgiver som legen har skrevet inn</Element>
        {visVårVerdi(SykmeldingOpplysningEnum.ARBEIDSGIVER)}
        <Element className={tittelKlasseNavn}>Lege/sykmelder</Element>
        {visVårVerdi(SykmeldingOpplysningEnum.SYKMELDER)}
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
