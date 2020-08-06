import { useAppStore } from '../../data/stores/app-store';
import { ReisetilskuddInterface } from '../../models/reisetilskudd';
import { validerTall } from '../../utils/skjemavalidering';
import { utbetalingSpørsmålVerdier } from '../sporsmal/sporsmalTekster';

const useReisetilskuddTilGlobalState = (): (reisetilskudd: ReisetilskuddInterface) => void => {
  const {
    setActiveMegArbeidsgiver,

    settDagensTransportMiddelGårChecked,
    settDagensTransportMiddelSyklerChecked,
    settDagensTransportMiddelEgenBilChecked,
    settDagensTransportMiddelKollektivChecked,

    settMånedligeUtgifterState,
    settAntallKilometerState,

    settAktivtReisetilskuddId,

    settKvitteringer,
  } = useAppStore();

  return (valgtReisetilskudd : ReisetilskuddInterface) => {
    settAktivtReisetilskuddId(valgtReisetilskudd.reisetilskuddId);

    if (valgtReisetilskudd.utbetalingTilArbeidsgiver === true) {
      setActiveMegArbeidsgiver(utbetalingSpørsmålVerdier.ARBEIDSGIVER);
    } else if (valgtReisetilskudd.utbetalingTilArbeidsgiver === false) {
      setActiveMegArbeidsgiver(utbetalingSpørsmålVerdier.MEG);
    } else if (valgtReisetilskudd.utbetalingTilArbeidsgiver === undefined) {
      setActiveMegArbeidsgiver('');
    }

    if (valgtReisetilskudd.går) {
      settDagensTransportMiddelGårChecked(valgtReisetilskudd.går);
    } else {
      settDagensTransportMiddelGårChecked(false);
    }

    if (valgtReisetilskudd.sykler) {
      settDagensTransportMiddelSyklerChecked(valgtReisetilskudd.sykler);
    } else {
      settDagensTransportMiddelSyklerChecked(false);
    }

    if (valgtReisetilskudd.egenBil
      && validerTall(valgtReisetilskudd.egenBil)) {
      settDagensTransportMiddelEgenBilChecked(true);
      settAntallKilometerState(valgtReisetilskudd.egenBil.toString());
    } else {
      settDagensTransportMiddelEgenBilChecked(false);
      settAntallKilometerState('');
    }

    if (valgtReisetilskudd.kollektivtransport
    && validerTall(valgtReisetilskudd.kollektivtransport)) {
      settMånedligeUtgifterState(valgtReisetilskudd.kollektivtransport.toString());
      settDagensTransportMiddelKollektivChecked(true);
    } else {
      settDagensTransportMiddelKollektivChecked(false);
      settMånedligeUtgifterState('');
    }

    if (valgtReisetilskudd.kvitteringer !== undefined) {
      settKvitteringer(valgtReisetilskudd.kvitteringer);
    }
  };
};

export default useReisetilskuddTilGlobalState;
