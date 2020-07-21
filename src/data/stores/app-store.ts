/* eslint-disable object-property-newline */
import constate from 'constate';
import { useState } from 'react';
import { PeriodeInterface, Transportmiddel } from '../../models/periode';
import { SykmeldingOpplysningInterface } from '../../models/sykmelding';

import { generateId } from '../../utils/random';

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

const mockSykmelding = [{
  periode: '25. mai - 7.juni 2020 - 14 dager',
  diagnose: 'Diaré',
  bidiagnose: 'ADHD',
  beskrivFraver: 'Reisetilskudd',
  beskrivHensyn: 'Må ha eget toalett på jobb',
  arbeidsgiver: 'Donald Trump',
  sykmelder: 'Dr. McDreamy',
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
  const [opplysningerSykmeldinger,
    settOpplysningerSykmeldinger] = useState<SykmeldingOpplysningInterface[]>(mockSykmelding);

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
    opplysningerSykmeldinger, settOpplysningerSykmeldinger,

  };
});
