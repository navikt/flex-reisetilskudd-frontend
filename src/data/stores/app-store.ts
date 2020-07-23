/* eslint-disable object-property-newline */
import constate from 'constate';
import { useState } from 'react';
import { PeriodeInterface, Transportmiddel } from '../../models/periode';
import { SykmeldingOpplysningInterface } from '../../models/sykmelding';

import { generateId } from '../../utils/random';
import {
  dagensTransportmiddelStateDefault,
  DagensTransportmiddelSvarInterface,
} from '../../models/dagenstransportmiddel';

const mockPerioder = [
  {
    id: generateId(),
    vedlegg: [
      {
        id: 'tetstsgddgsdsdsdsdsdgsdg', navn: 'foo.txt', størrelse: 1024 * 920, beløp: 32.2, dato: new Date(),
      },
      {
        id: 'dhdywdjdjsjdsjdscehshdsd', navn: 'bar.jpg', størrelse: 812 * 920, beløp: 2.2, dato: new Date(),
      },
    ],
    fraDato: new Date(),
    tilDato: new Date(),
    transportMiddel: Transportmiddel.taxi,
  },
  {
    id: generateId(),
    vedlegg: [
      {
        id: 'sdjjdskdfhhfsdksdwewien', navn: 'foo.txt', størrelse: 1024 * 920, beløp: 32.2, dato: new Date(),
      },
      {
        id: 'dsjsdjdsdjsdjjdsjdjshhf', navn: 'bar.jpg', størrelse: 812 * 920, beløp: 2.2, dato: new Date(),
      },
    ],
    transportMiddel: Transportmiddel.egenBil,
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
  const [perioder, settPerioder] = useState<PeriodeInterface[]>(mockPerioder);
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
    perioder, settPerioder,
    uopplastetFil, settUopplastetFil,
    filopplasterFeilmeldinger, settFilopplasterFeilmeldinger,
    åpenFilopplasterModal, settÅpenFilopplasterModal,
    opplysningerSykmeldinger, settOpplysningerSykmeldinger,
  };
});
