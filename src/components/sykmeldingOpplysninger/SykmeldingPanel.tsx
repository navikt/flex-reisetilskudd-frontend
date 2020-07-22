import React, { ReactElement } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst } from 'nav-frontend-typografi';
import './sykmeldingOpplysninger.less';
import SykmeldingOpplysninger from './SykmeldingOpplysninger';
import { useAppStore } from '../../data/stores/app-store';
import { hentSykmeldinger } from './hentSykmeldinger';

const SykmeldingPanel = () : ReactElement => {
  const {
    midlertidigOpplysningerSykmeldinger,
    settMidlertidigOpplysningerSykmeldinger,
  } = useAppStore();

  if (midlertidigOpplysningerSykmeldinger === undefined) {
    hentSykmeldinger(settMidlertidigOpplysningerSykmeldinger);
  }

  return (
    <div className="sykmelding-opplysninger-wrapper">

      <Ekspanderbartpanel className="sykmelding-innhold" tittel={<Normaltekst>Opplysninger om sykmeldingen</Normaltekst>}>
        <hr className="sykmelding-linje" />
        <SykmeldingOpplysninger />
      </Ekspanderbartpanel>
    </div>
  );
};

export default SykmeldingPanel;
