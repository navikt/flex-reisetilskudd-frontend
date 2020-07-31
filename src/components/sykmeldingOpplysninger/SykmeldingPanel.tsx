import React, { ReactElement, useEffect } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst } from 'nav-frontend-typografi';
import './sykmeldingOpplysninger.less';
import SykmeldingOpplysninger from './SykmeldingOpplysninger';
import { useAppStore } from '../../data/stores/app-store';
import { hentSykmeldinger } from './hentSykmeldinger';

const SykmeldingPanel = () : ReactElement => {
  const {
    settOpplysningerSykmeldinger,
  } = useAppStore();

  useEffect(() => {
    hentSykmeldinger(settOpplysningerSykmeldinger);
  }, [settOpplysningerSykmeldinger]);

  return (
    <div className="sykmelding-panel-wrapper">

      <Ekspanderbartpanel className="sykmelding-innhold" tittel={<Normaltekst>Opplysninger om sykmeldingen</Normaltekst>}>
        <hr className="sykmelding-linje" />
        <SykmeldingOpplysninger />
      </Ekspanderbartpanel>
    </div>
  );
};

export default SykmeldingPanel;
