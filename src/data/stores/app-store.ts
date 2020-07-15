/* eslint-disable object-property-newline */
import constate from 'constate';
import { useState } from 'react';

export const [AppStoreProvider, useAppStore] = constate(() => {
  const [activeOffentligPrivat, setActiveOffentligPrivat] = useState<string>('');
  const [egenBilChecked, setEgenBilChecked] = useState<boolean>();
  const [syklerChecked, setSyklerChecked] = useState<boolean>();
  const [gårChecked, setGårChecked] = useState<boolean>();

  return {
    activeOffentligPrivat, setActiveOffentligPrivat,
    egenBilChecked, setEgenBilChecked,
    syklerChecked, setSyklerChecked,
    gårChecked, setGårChecked,
  };
});
