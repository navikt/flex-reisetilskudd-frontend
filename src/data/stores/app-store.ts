/* eslint-disable object-property-newline */
import constate from 'constate';
import { useState } from 'react';
import { KvitteringInterface } from '../../models/vedlegg';
import { SykmeldingOpplysningInterface } from '../../models/sykmelding';
import {
  dagensTransportmiddelStateDefault,
  DagensTransportmiddelSvarInterface,
} from '../../models/dagenstransportmiddel';

const mockKvitteringer: Array<KvitteringInterface> = [
  {
    id: 'tetstsgddgsdsdsdsdsdgsdg', navn: 'foo.txt', størrelse: 1024 * 920, beløp: 32.2, dato: new Date(),
  },
  {
    id: 'dhdywdjdjsjdsjdscehshdsd', navn: 'bar.jpg', størrelse: 812 * 920, beløp: 2.2, dato: new Date(),
  },
];

export const [AppStoreProvider, useAppStore] = constate(() => {
  const [
    dagensTransportmiddelState, settDagensTransportmiddelState,
  ] = useState<DagensTransportmiddelSvarInterface>(dagensTransportmiddelStateDefault);
  const [
    dagensTransportMiddelValidert, settDagensTransportMiddelValidert,
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

  return {
    dagensTransportmiddelState, settDagensTransportmiddelState,
    dagensTransportMiddelValidert, settDagensTransportMiddelValidert,
    activeMegArbeidsgiver, setActiveMegArbeidsgiver,
    kvitteringer, settKvitteringer,
    uopplastetFil, settUopplastetFil,
    filopplasterFeilmeldinger, settFilopplasterFeilmeldinger,
    åpenFilopplasterModal, settÅpenFilopplasterModal,
    opplysningerSykmeldinger, settOpplysningerSykmeldinger,
  };
});
