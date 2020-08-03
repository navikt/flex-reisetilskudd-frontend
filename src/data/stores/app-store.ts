/* eslint-disable object-property-newline */
import constate from 'constate';
import { useState } from 'react';
import { KvitteringInterface, Transportmiddel } from '../../models/kvittering';
import { SykmeldingOpplysningInterface } from '../../models/sykmelding';

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
  const [kvitteringer, settKvitteringer] = useState<KvitteringInterface[]>(mockKvitteringer);
  const [uopplastetFil, settUopplastetFil] = useState<File | null>(null);
  const [filopplasterFeilmeldinger, settFilopplasterFeilmeldinger] = useState<string[]>([]);
  const [åpenFilopplasterModal, settÅpenFilopplasterModal] = useState<boolean>(false);
  const [
    opplysningerSykmeldinger,
    settOpplysningerSykmeldinger,
  ] = useState<SykmeldingOpplysningInterface[] | undefined>(undefined);
  const [transportmiddel, settTransportmiddel] = useState<Transportmiddel.TAXI |
  Transportmiddel.KOLLEKTIV |
  Transportmiddel.EGEN_BIL | undefined>();

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
    kvitteringer, settKvitteringer,
    uopplastetFil, settUopplastetFil,
    filopplasterFeilmeldinger, settFilopplasterFeilmeldinger,
    åpenFilopplasterModal, settÅpenFilopplasterModal,
    opplysningerSykmeldinger, settOpplysningerSykmeldinger,
    transportmiddel, settTransportmiddel,
  };
});
