import React, { ReactElement, useState } from 'react';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { Link } from 'react-router-dom';
import env from '../../utils/environment';
import { logger } from '../../utils/logger';
import Reisetilskudd from '../../components/dineReisetilskudd/Reisetilskudd';
import Vis from '../../components/Vis';
import { get } from '../../data/fetcher/fetcher';

interface ReisetilskuddInterface {
  fnr?: string,
  fom?: string,
  orgNavn?: string,
  orgNummer?: string,
  reisetilskuddId?: string,
  sykmeldingId?: string,
  tom?: string,
}

function DineReisetilskudd(): ReactElement {
  const { apiUrl } = env;
  const [
    reisetilskuddene, settReisetilskuddene,
  ] = useState<ReisetilskuddInterface[] | undefined>(undefined);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  const hentReisetilskudd = () : void => {
    get<ReisetilskuddInterface[]>(`${apiUrl}/reisetilskudd`)
    .then(req => settReisetilskuddene(req.parsedBody))
    .catch(err => logger.error(err));
  };

  if (isFirstRender) {
    hentReisetilskudd();
    setIsFirstRender(false);
  }

  return (
    <div className="app-page dine-reisetilskudd-side">
      <Sidetittel tag="h1" className="sidetopp__tittel">
        Dine reisetilskudd
      </Sidetittel>
      <Vis hvis={reisetilskuddene && reisetilskuddene.length < 1}>
        <Normaltekst>
          Det kan se ut som om du ikke har noen registrerte reisetilskudd, gå til
          {' '}
          {' '}
          <Link to="/#">Dine sykmeldinger</Link>
          {' '}
          for å se om det ligger noe der.
        </Normaltekst>
      </Vis>
      <Vis hvis={reisetilskuddene}>
        {reisetilskuddene?.map((value) => <Reisetilskudd key={`reisetilskudd-${value?.reisetilskuddId}`} reisetilskudd={value} />)}
      </Vis>
      <Vis hvis={reisetilskuddene === undefined}>
        <Normaltekst>Teknisk feil, kunne ikke finne noen reisetilskudd</Normaltekst>
      </Vis>

    </div>
  );
}

export default DineReisetilskudd;
