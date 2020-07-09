import React, { ReactElement } from 'react';
import RadioPG from '../../components/sporsmal/Sporsmal';

interface Svaralternativ {
  label: string,
  value: string,
  id: string,
}

interface RadioPGProps {
  tittel: string,
  name: string,
  spørsmålstekst: string,
  svaralternativer: Svaralternativ[],
}

const alternativ1: Svaralternativ = {
  label: 'Ja',
  value: 'Ja',
  id: 'Ja',
};

const alternativ2: Svaralternativ = {
  label: 'Nei',
  value: 'Nei',
  id: 'Nei',
};

const alternativ3: Svaralternativ = {
  label: 'Tja',
  value: 'Tja',
  id: 'Tja',
};

const radioPGProps: RadioPGProps = {
  tittel: 'Test',
  name: 'Test',
  spørsmålstekst: 'Vi tester',
  svaralternativer: [alternativ1, alternativ2, alternativ3],
};

function Utbetaling(): ReactElement {
  return (
    <div>
      <RadioPG
        tittel={radioPGProps.tittel}
        name={radioPGProps.name}
        spørsmålstekst={radioPGProps.spørsmålstekst}
        svaralternativer={radioPGProps.svaralternativer}
      />
    </div>
  );
}

export default Utbetaling;
