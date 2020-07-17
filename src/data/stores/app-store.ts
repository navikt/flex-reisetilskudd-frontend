/* eslint-disable object-property-newline */
import constate from 'constate';
import { useState } from 'react';
import { IPeriode, Transportmiddel } from '../../models/periode';

import { generateId } from '../../utils/random';

const mockPerioder = [
  {
    id: generateId(),
    vedlegg: [],
    fraDato: new Date(),
    tilDato: new Date(),
    transportMiddel: Transportmiddel.taxi,
  },
  {
    id: generateId(),
    vedlegg: [],
    transportMiddel: Transportmiddel.egenBil,
  },
];

export const [AppStoreProvider, useAppStore] = constate(() => {
  const [activeOffentligPrivat, setActiveOffentligPrivat] = useState<string>('');
  const [egenBilChecked, setEgenBilChecked] = useState<boolean>(false);
  const [syklerChecked, setSyklerChecked] = useState<boolean>(false);
  const [gårChecked, setGårChecked] = useState<boolean>(false);
  const [perioder, settPerioder] = useState<IPeriode[]>(mockPerioder);
  const [uopplastetFil, settUopplastetFil] = useState<File | null>(null);
  const [filopplasterFeilmeldinger, settFilopplasterFeilmeldinger] = useState<string[]>([]);
  const [åpenFilopplasterModal, settÅpenFilopplasterModal] = useState<boolean>(false);

  return {
    activeOffentligPrivat, setActiveOffentligPrivat,
    egenBilChecked, setEgenBilChecked,
    syklerChecked, setSyklerChecked,
    gårChecked, setGårChecked,
    perioder, settPerioder,
    uopplastetFil, settUopplastetFil,
    filopplasterFeilmeldinger, settFilopplasterFeilmeldinger,
    åpenFilopplasterModal, settÅpenFilopplasterModal,
  };
});
