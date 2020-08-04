import React, { ReactElement, useEffect } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Undertittel } from 'nav-frontend-typografi';
import './sykmeldingOpplysninger.less';
import { useParams } from 'react-router-dom';
import SykmeldingOpplysninger from './SykmeldingOpplysninger';
import { useAppStore } from '../../data/stores/app-store';
import { fåSykmeldingIDFraAktivtReisetilskuddID, hentSykmeldinger } from './hentSykmeldinger';

const SykmeldingPanel = () : ReactElement => {
  const {
    opplysningerSykmeldinger,
    settOpplysningerSykmeldinger,
    sykmeldingID, settSykmeldingID,
  } = useAppStore();
  const { soknadsID } = useParams();

  useEffect(() => {
    if (!opplysningerSykmeldinger && sykmeldingID) {
      hentSykmeldinger(settOpplysningerSykmeldinger, sykmeldingID);
    }
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [settOpplysningerSykmeldinger, sykmeldingID]);

  useEffect(() => {
    if (!sykmeldingID) {
      fåSykmeldingIDFraAktivtReisetilskuddID(soknadsID, settSykmeldingID);
    }
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [sykmeldingID]);

  return (
    <div className="sykmelding-panel-wrapper">

      <Ekspanderbartpanel className="sykmelding-innhold" tittel={<Undertittel>Opplysninger fra sykmeldingen</Undertittel>}>
        <hr className="sykmelding-linje" />
        <SykmeldingOpplysninger />
      </Ekspanderbartpanel>
    </div>
  );
};

export default SykmeldingPanel;
