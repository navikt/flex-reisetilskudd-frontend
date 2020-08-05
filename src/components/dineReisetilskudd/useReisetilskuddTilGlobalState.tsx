import { useAppStore } from '../../data/stores/app-store';
import { ReisetilskuddInterface } from '../../models/reisetilskudd';
import { validerTall } from '../../utils/skjemavalidering';

const useReisetilskuddTilGlobalState = (): (a: ReisetilskuddInterface) => void => {
  const {
    setActiveMegArbeidsgiver,

    settDagensTransportMiddelGårChecked,
    settDagensTransportMiddelSyklerChecked,
    settDagensTransportMiddelEgenBilChecked,
    settDagensTransportMiddelKollektivChecked,

    settMånedligeUtgifterState,
    settAntallKilometerState,

    settAktivtReisetilskuddId,
  } = useAppStore();

  return (valgtReisetilskudd : ReisetilskuddInterface) => {
    settAktivtReisetilskuddId(valgtReisetilskudd.reisetilskuddId);

    if (valgtReisetilskudd.utbetalingTilArbeidsgiver) {
      setActiveMegArbeidsgiver(valgtReisetilskudd.utbetalingTilArbeidsgiver);
    } else {
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
  };
};

export default useReisetilskuddTilGlobalState;
