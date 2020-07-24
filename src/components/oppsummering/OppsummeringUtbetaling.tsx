import React, { ReactElement } from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { useAppStore } from '../../data/stores/app-store';
import Vis from '../Vis';
import { utbetalingSpørsmålVerdier } from '../sporsmal/spørsmålTekster';
import { ArbeidsgiverInterface } from '../../models/arbeidsgiver';

const OppsummeringUtbetaling = () : ReactElement => {
  const { activeMegArbeidsgiver } = useAppStore();

  const getArbeidsgiver = () : ArbeidsgiverInterface => ({
    navn: 'Arbeids- og velferdsetaten',
    orgNr: '392392482849',
  });

  return (
    <div className="oppsummering-element oppsummering-utbetaling">
      <Undertittel className="oppsummering-underoverskrift">Hvem skal pengene utbetales til?</Undertittel>
      <Vis hvis={activeMegArbeidsgiver === utbetalingSpørsmålVerdier.MEG}>
        <Normaltekst>
          Pengene skal utbetales til deg.
        </Normaltekst>
      </Vis>
      <Vis hvis={activeMegArbeidsgiver === utbetalingSpørsmålVerdier.ARBEIDSGIVER}>
        <Normaltekst>
          {`Pengene skal utbetales til ${getArbeidsgiver().navn} (org.nr. ${getArbeidsgiver().orgNr}).`}
        </Normaltekst>
      </Vis>
    </div>
  );
};

export default OppsummeringUtbetaling;
