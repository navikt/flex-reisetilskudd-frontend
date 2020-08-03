import React, { ReactElement } from 'react';
import { Element } from 'nav-frontend-typografi';
import './reisetilskudd.less';
import { Link } from 'react-router-dom';

interface ReisetilskuddInterface {
  fnr?: string,
  fom?: string,
  orgNavn?: string,
  orgNummer?: string,
  reisetilskuddId?: string,
  sykmeldingId?: string,
  tom?: string,
}

interface Props {
  reisetilskudd: ReisetilskuddInterface,
}

const Reisetilskudd = ({ reisetilskudd }: Props) : ReactElement => (
  <div className="reisetilskudd-element-wrapper">
    <Element className="reisetilskudd-id">
      Reisetilskudd-ID:
      {' '}
      {reisetilskudd?.reisetilskuddId}
    </Element>
    <Element className="sykmelding-id">
      Sykmelding-ID:
      {' '}
      {reisetilskudd?.sykmeldingId}
    </Element>
    <Element>
      orgNavn:
      {' '}
      {reisetilskudd?.orgNavn}
    </Element>
    <Element>
      orgNummer:
      {' '}
      {reisetilskudd?.orgNummer}
    </Element>
    <Element>
      fraDato:
      {' '}
      {reisetilskudd?.fom}
    </Element>
    <Element>
      tilDato:
      {' '}
      {reisetilskudd?.tom}
    </Element>
    <Link to={`/soknaden/${reisetilskudd.reisetilskuddId}/1`}>
      Trykk her :)
    </Link>
    <hr />
  </div>
);

export default Reisetilskudd;
