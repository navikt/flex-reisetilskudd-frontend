import React, { ReactElement } from 'react';
import Lenke from 'nav-frontend-lenker';
import Chevron from 'nav-frontend-chevron';
import { Normaltekst } from 'nav-frontend-typografi';
import { useHistory } from 'react-router-dom';
import Vis from '../Vis';
import { SEPARATOR } from '../../utils/constants';

type TilbakeknappProps = {aktivtSteg: number};

export const pathUtenSteg = (pathname: string) : string => {
  const arr: string[] = pathname.split(SEPARATOR);
  arr.pop();
  return arr.join(SEPARATOR);
};

function TilbakeKnapp({ aktivtSteg } : TilbakeknappProps): ReactElement {
  const history = useHistory();
  return (
    <div className="tilbakeKnapp">
      <Normaltekst>
        <Vis hvis={aktivtSteg === 1}>
          {/* Hvis vi er på første side i vår søknad og skal gå et annet sted */}
          <Lenke href="#">
            <Chevron type="venstre" />
            <span>Tilbake til forside</span>
          </Lenke>
        </Vis>
        <Vis hvis={aktivtSteg > 1}>
          <Lenke href={pathUtenSteg(history.location.pathname) + SEPARATOR + (aktivtSteg - 1)}>
            <Chevron type="venstre" />
            <span>Tilbake</span>
          </Lenke>
        </Vis>
      </Normaltekst>
    </div>
  );
}

export default TilbakeKnapp;
