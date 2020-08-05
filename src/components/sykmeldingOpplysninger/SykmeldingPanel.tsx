import React, { ReactElement, useEffect } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Undertittel } from 'nav-frontend-typografi';
import './sykmeldingOpplysninger.less';
import SykmeldingOpplysninger from './SykmeldingOpplysninger';
import { useAppStore } from '../../data/stores/app-store';
import { fåSykmeldingIDFraAktivtReisetilskuddID, hentSykmeldinger } from './hentSykmeldinger';

const SykmeldingPanel = () : ReactElement => {
  const {
    settOpplysningerSykmeldinger,
    sykmeldingID, settSykmeldingID,
    aktivtReisetilskuddId,
  } = useAppStore();

  useEffect(() => {
    if (sykmeldingID) {
      hentSykmeldinger(settOpplysningerSykmeldinger, sykmeldingID);
    }
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [settOpplysningerSykmeldinger, sykmeldingID]);

  useEffect(() => {
    if (aktivtReisetilskuddId) {
      fåSykmeldingIDFraAktivtReisetilskuddID(aktivtReisetilskuddId, settSykmeldingID);
    }
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [aktivtReisetilskuddId]);

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
