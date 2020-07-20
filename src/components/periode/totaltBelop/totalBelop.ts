import { PeriodeInterface } from '../../../models/periode';

const totaltBeløp = (periode : PeriodeInterface) : number => (periode.vedlegg
  ? (
    periode.vedlegg
      .filter((vedlegg) => vedlegg.beløp)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .map((vedlegg) => vedlegg.beløp!)
      .reduce((a, b) => a + b, 0.0)
  )
  : (0.0));

export default totaltBeløp;
