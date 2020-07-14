/* eslint-disable object-property-newline */
import constate from 'constate';
import { useState } from 'react';

export const [AppStoreProvider, useAppStore] = constate(() => {
  const [activeOffentligPrivat, setActiveOffentligPrivat] = useState<string>('OFFENTLIG');
  const [top, setTop] = useState<number>(0);

  return {
    activeOffentligPrivat, setActiveOffentligPrivat,
    top, setTop,
  };
});
