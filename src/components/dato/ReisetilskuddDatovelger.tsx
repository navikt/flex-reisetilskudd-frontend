import React, { useState } from 'react';
import { Datovelger } from 'nav-datovelger';

const ReisetilskuddDatovelger: React.FC = () => {
  const [dato, setDato] = useState('');

  const validerDato = (d : string | null | undefined) => {
    if (typeof d === 'string') {
      setDato(d);
    }
  };

  return (
    <Datovelger valgtDato={dato} onChange={(d) => validerDato(d)} />
  );
};

export default ReisetilskuddDatovelger;
