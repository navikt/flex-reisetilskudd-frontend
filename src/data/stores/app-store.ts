/* eslint-disable object-property-newline */
import constate from 'constate';
import { useState } from 'react';
import { KvitteringInterface, Transportmiddel, TransportmiddelAlternativer } from '../../models/kvittering';
import { SykmeldingOpplysningInterface } from '../../models/sykmelding';
import { ReisetilskuddInterface } from '../../models/reisetilskudd';

const mockKvitteringer: Array<KvitteringInterface> = [
  {
    reisetilskuddId: '6969',
    kvitteringId: 'tetstsgddgsdsdsdsdsdgsdg',
    navn: 'foo.txt',
    storrelse: 1024 * 920,
    belop: 32.2,
    fom: new Date('2020-05-01'),
    transportmiddel: Transportmiddel.EGEN_BIL,
  },
  {
    reisetilskuddId: '12352',
    kvitteringId: 'dhdywdjdjsjdsjdscehshdsd',
    navn: 'bar.jpg',
    storrelse: 812 * 920,
    belop: 2.2,
    fom: new Date('2034-09-29'),
    transportmiddel: Transportmiddel.TAXI,
  },
];

export const [AppStoreProvider, useAppStore] = constate(() => {
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

  const [activeMegArbeidsgiver, setActiveMegArbeidsgiver] = useState<string>('');
  const [utbetalingspørsmålValidert, settUtbetalingspørsmålValidert,
  ] = useState<boolean | undefined>(undefined);
  const [kvitteringer, settKvitteringer] = useState<KvitteringInterface[]>(mockKvitteringer);
  const [uopplastetFil, settUopplastetFil] = useState<File | null>(null);
  const [filopplasterFeilmeldinger, settFilopplasterFeilmeldinger] = useState<string[]>([]);
  const [åpenFilopplasterModal, settÅpenFilopplasterModal] = useState<boolean>(false);
  const [
    opplysningerSykmeldinger,
    settOpplysningerSykmeldinger,
  ] = useState<SykmeldingOpplysningInterface[] | undefined>(undefined);
  const [
    transportmiddelKvittering, settTransportmiddelKvittering,
  ] = useState<TransportmiddelAlternativer>();

  const [
    reisetilskuddene, settReisetilskuddene,
  ] = useState<ReisetilskuddInterface[] | undefined>();

  const [
    aktivtReisetilskuddId, settAktivtReisetilskuddId,
  ] = useState<string>();

  return {
    /* DAGENS TRANSPORTMIDDEL */
    dagensTransportMiddelEgenBilChecked, settDagensTransportMiddelEgenBilChecked,
    dagensTransportMiddelSyklerChecked, settDagensTransportMiddelSyklerChecked,
    dagensTransportMiddelGårChecked, settDagensTransportMiddelGårChecked,
    dagensTransportMiddelKollektivChecked, settDagensTransportMiddelKollektivChecked,
    månedligeUtgifterState, settMånedligeUtgifterState,
    antallKilometerState, settAntallKilometerState,
    dagensTransportmiddelValidert, settDagensTransportmiddelValidert,

    activeMegArbeidsgiver, setActiveMegArbeidsgiver,
    utbetalingspørsmålValidert, settUtbetalingspørsmålValidert,
    kvitteringer, settKvitteringer,
    uopplastetFil, settUopplastetFil,
    filopplasterFeilmeldinger, settFilopplasterFeilmeldinger,
    åpenFilopplasterModal, settÅpenFilopplasterModal,
    opplysningerSykmeldinger, settOpplysningerSykmeldinger,
    transportmiddelKvittering, settTransportmiddelKvittering,
    reisetilskuddene, settReisetilskuddene,
    aktivtReisetilskuddId, settAktivtReisetilskuddId,
  };
});
