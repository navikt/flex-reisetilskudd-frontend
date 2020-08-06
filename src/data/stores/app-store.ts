/* eslint-disable object-property-newline */
import constate from 'constate';
import { useState } from 'react';
import { KvitteringInterface, TransportmiddelAlternativer } from '../../models/kvittering';
import { SykmeldingOpplysningInterface } from '../../models/sykmelding';
import { ReisetilskuddInterface } from '../../models/reisetilskudd';
import mockKvitteringer from '../mock/kvitteringer';

export const [AppStoreProvider, useAppStore] = constate(() => {
  /* GENERELT */
  const [
    reisetilskuddene, settReisetilskuddene,
  ] = useState<ReisetilskuddInterface[] | undefined>();
  const [
    aktivtReisetilskuddId, settAktivtReisetilskuddId,
  ] = useState<string>();

  /* UTBETALINGSSPØRSMÅL */
  const [activeMegArbeidsgiver, setActiveMegArbeidsgiver] = useState<string>('');
  const [utbetalingspørsmålValidert, settUtbetalingspørsmålValidert,
  ] = useState<boolean | undefined>(undefined);

  /* DAGENS TRANSPORTMIDDEL */
  const [dagensTransportMiddelEgenBilChecked, settDagensTransportMiddelEgenBilChecked,
  ] = useState<boolean>(false);
  const [dagensTransportMiddelSyklerChecked, settDagensTransportMiddelSyklerChecked,
  ] = useState<boolean>(false);
  const [dagensTransportMiddelGårChecked, settDagensTransportMiddelGårChecked,
  ] = useState<boolean>(false);
  const [dagensTransportMiddelKollektivChecked, settDagensTransportMiddelKollektivChecked,
  ] = useState<boolean>(false);
  const [månedligeUtgifterState, settMånedligeUtgifterState] = useState<string>('');
  const [antallKilometerState, settAntallKilometerState] = useState<string>('');
  const [
    dagensTransportmiddelValidert, settDagensTransportmiddelValidert,
  ] = useState<boolean | undefined>(undefined);

  /* KVITTERINGSOPPLASTING */
  const [kvitteringer, settKvitteringer] = useState<KvitteringInterface[]>(mockKvitteringer);
  const [uopplastetFil, settUopplastetFil] = useState<File | null>(null);
  const [filopplasterFeilmeldinger, settFilopplasterFeilmeldinger] = useState<string[]>([]);
  const [åpenFilopplasterModal, settÅpenFilopplasterModal] = useState<boolean>(false);
  const [
    transportmiddelKvittering, settTransportmiddelKvittering,
  ] = useState<TransportmiddelAlternativer>();

  /* OPPLYSNINGER FRA SYKMELDINGEN */
  const [
    opplysningerSykmeldinger,
    settOpplysningerSykmeldinger,
  ] = useState<SykmeldingOpplysningInterface[] | undefined>(undefined);
  const [
    sykmeldingID, settSykmeldingID,
  ] = useState<string>('');

  return {
    /* GENERELT */
    reisetilskuddene, settReisetilskuddene,
    aktivtReisetilskuddId, settAktivtReisetilskuddId,

    /* UTBETALINGSSPØRSMÅL */
    activeMegArbeidsgiver, setActiveMegArbeidsgiver,
    utbetalingspørsmålValidert, settUtbetalingspørsmålValidert,

    /* DAGENS TRANSPORTMIDDEL */
    dagensTransportMiddelEgenBilChecked, settDagensTransportMiddelEgenBilChecked,
    dagensTransportMiddelSyklerChecked, settDagensTransportMiddelSyklerChecked,
    dagensTransportMiddelGårChecked, settDagensTransportMiddelGårChecked,
    dagensTransportMiddelKollektivChecked, settDagensTransportMiddelKollektivChecked,
    månedligeUtgifterState, settMånedligeUtgifterState,
    antallKilometerState, settAntallKilometerState,
    dagensTransportmiddelValidert, settDagensTransportmiddelValidert,

    /* KVITTERINGSOPPLASTING */
    kvitteringer, settKvitteringer,
    uopplastetFil, settUopplastetFil,
    filopplasterFeilmeldinger, settFilopplasterFeilmeldinger,
    åpenFilopplasterModal, settÅpenFilopplasterModal,
    transportmiddelKvittering, settTransportmiddelKvittering,

    /* OPPLYSNINGER FRA SYKMELDINGEN */
    opplysningerSykmeldinger, settOpplysningerSykmeldinger,
    sykmeldingID, settSykmeldingID,
  };
});
