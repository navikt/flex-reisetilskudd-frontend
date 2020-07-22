import React, { ReactElement } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst } from 'nav-frontend-typografi';
import './sykmeldingOpplysninger.less';
import SykmeldingOpplysninger from './SykmeldingOpplysninger';

const SykmeldingPanel = () : ReactElement => (
  <div className="sykmelding-opplysninger-wrapper">

    <Ekspanderbartpanel className="sykmelding-innhold" tittel={<Normaltekst>Opplysninger om sykmeldingen</Normaltekst>}>
      <hr className="sykmelding-linje" />
      <SykmeldingOpplysninger />
    </Ekspanderbartpanel>
  </div>
);

export default SykmeldingPanel;
