/* eslint-disable object-property-newline */
import constate from 'constate';
import { useState } from 'react';
import { KvitteringInterface, Transportmiddel, TransportmiddelAlternativer } from '../../models/kvittering';
import { SykmeldingOpplysningInterface } from '../../models/sykmelding';

const mockKvitteringer: Array<KvitteringInterface> = [
  {
    id: 'tetstsgddgsdsdsdsdsdgsdg',
    navn: 'foo.txt',
    størrelse: 1024 * 920,
    beløp: 32.2,
    dato: new Date('2020-05-01'),
    transportmiddel: Transportmiddel.EGEN_BIL,
  },
  {
    id: 'dhdywdjdjsjdsjdscehshdsd',
    navn: 'bar.jpg',
    størrelse: 812 * 920,
    beløp: 2.2,
    dato: new Date('2034-09-29'),
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
  const [
    transportmiddelKvittering, settTransportmiddelKvittering,
  ] = useState<TransportmiddelAlternativer>();

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
    transportmiddelKvittering, settTransportmiddelKvittering,
  };
});
