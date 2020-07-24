/* eslint-disable object-property-newline */
import constate from 'constate';
import { useState } from 'react';
import { KvitteringInterface, Transportmiddel } from '../../models/kvittering';
import { SykmeldingOpplysningInterface } from '../../models/sykmelding';
import {
  dagensTransportmiddelStateDefault,
  DagensTransportmiddelSvarInterface,
} from '../../models/dagenstransportmiddel';

const mockKvitteringer: Array<KvitteringInterface> = [
  {
    id: 'tetstsgddgsdsdsdsdsdgsdg', navn: 'foo.txt', størrelse: 1024 * 920, beløp: 32.2, dato: new Date(), transportmiddel: Transportmiddel.EGEN_BIL,
  },
  {
    id: 'dhdywdjdjsjdsjdscehshdsd', navn: 'bar.jpg', størrelse: 812 * 920, beløp: 2.2, dato: new Date(), transportmiddel: Transportmiddel.TAXI,
  },
];

export const [AppStoreProvider, useAppStore] = constate(() => {
  const [
    dagensTransportmiddelState, settDagensTransportmiddelState,
  ] = useState<DagensTransportmiddelSvarInterface>(dagensTransportmiddelStateDefault);
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
    dagensTransportmiddelState, settDagensTransportmiddelState,
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
