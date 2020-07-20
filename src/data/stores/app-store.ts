/* eslint-disable object-property-newline */
import constate from 'constate';
import { useState } from 'react';
import { PeriodeInterface, Transportmiddel } from '../../models/periode';

import { generateId } from '../../utils/random';

export interface DagensTransportmiddelSvarInterface {
  offentligPrivatSpørsmål: string | undefined,
  månedligeUtgifterSpørsmål: number | undefined,
  transportalternativerPrivat: {
    egenBilChecked: boolean,
    syklerChecked: boolean,
    gårChecked: boolean
  },
  antallKilometerSpørsmål: number | undefined,
}

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

const dagensTransportmiddelStateDefault : DagensTransportmiddelSvarInterface = {
  offentligPrivatSpørsmål: undefined,
  månedligeUtgifterSpørsmål: undefined,
  transportalternativerPrivat: {
    egenBilChecked: false,
    syklerChecked: false,
    gårChecked: false,
  },
  antallKilometerSpørsmål: undefined,
};

export const [AppStoreProvider, useAppStore] = constate(() => {
  const [activeOffentligPrivat, setActiveOffentligPrivat] = useState<string>('');
  const [egenBilChecked, setEgenBilChecked] = useState<boolean>(false);
  const [syklerChecked, setSyklerChecked] = useState<boolean>(false);
  const [gårChecked, setGårChecked] = useState<boolean>(false);
  // eslint-disable-next-line max-len
  const [dagensTransportmiddelState, settDagensTransportmiddelState] = useState<DagensTransportmiddelSvarInterface>(dagensTransportmiddelStateDefault);
  const [activeMegArbeidsgiver, setActiveMegArbeidsgiver] = useState<string>('');
  const [perioder, settPerioder] = useState<PeriodeInterface[]>(mockPerioder);
  const [uopplastetFil, settUopplastetFil] = useState<File | null>(null);
  const [filopplasterFeilmeldinger, settFilopplasterFeilmeldinger] = useState<string[]>([]);
  const [åpenFilopplasterModal, settÅpenFilopplasterModal] = useState<boolean>(false);

  return {
    activeOffentligPrivat, setActiveOffentligPrivat,
    egenBilChecked, setEgenBilChecked,
    syklerChecked, setSyklerChecked,
    gårChecked, setGårChecked,
    dagensTransportmiddelState, settDagensTransportmiddelState,
    activeMegArbeidsgiver, setActiveMegArbeidsgiver,
    perioder, settPerioder,
    uopplastetFil, settUopplastetFil,
    filopplasterFeilmeldinger, settFilopplasterFeilmeldinger,
    åpenFilopplasterModal, settÅpenFilopplasterModal,
  };
});
