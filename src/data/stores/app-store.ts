/* eslint-disable object-property-newline */
import constate from 'constate';
import { useState } from 'react';
import { PeriodeInterface, Transportmiddel } from '../../models/periode';

import { generateId } from '../../utils/random';

const mockPerioder = [
  {
    id: generateId(),
    vedlegg: [
      {
        navn: 'foo.txt', størrelse: 1024 * 920, beløp: 32.2, dato: new Date(),
      },
      {
        navn: 'bar.jpg', størrelse: 812 * 920, beløp: 2.2, dato: new Date(),
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
        navn: 'foo.txt', størrelse: 1024 * 920, beløp: 32.2, dato: new Date(),
      },
      {
        navn: 'bar.jpg', størrelse: 812 * 920, beløp: 2.2, dato: new Date(),
      },
    ],
    transportMiddel: Transportmiddel.egenBil,
  },
];

export const [AppStoreProvider, useAppStore] = constate(() => {
  const [activeOffentligPrivat, setActiveOffentligPrivat] = useState<string>('');
  const [egenBilChecked, setEgenBilChecked] = useState<boolean>(false);
  const [syklerChecked, setSyklerChecked] = useState<boolean>(false);
  const [gårChecked, setGårChecked] = useState<boolean>(false);
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
    activeMegArbeidsgiver, setActiveMegArbeidsgiver,
    perioder, settPerioder,
    uopplastetFil, settUopplastetFil,
    filopplasterFeilmeldinger, settFilopplasterFeilmeldinger,
    åpenFilopplasterModal, settÅpenFilopplasterModal,
  };
});
