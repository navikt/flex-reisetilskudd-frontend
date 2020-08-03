import React, { ReactElement } from 'react';
import { Element } from 'nav-frontend-typografi';
import './reisetilskudd.less';
import { Link } from 'react-router-dom';
import { HoyreChevron } from 'nav-frontend-chevron';
import { SøknadsIkon } from '../../assets/ikoner';
import { DatoFormat, formatertDato } from '../../utils/dato';
import Vis from '../Vis';

interface InngangsProps {
  to: string;
  children: React.ReactNode;
}

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
  <Link to={`/soknaden/${reisetilskudd.reisetilskuddId}/1`} className="reisetilskudd-element-wrapper">
    <SøknadsIkon />
    {
        /*
        <Element className="reisetilskudd-id">
      Reisetilskudd-ID:
      {' '}
      {reisetilskudd.reisetilskuddId}
    </Element>
    <Element className="sykmelding-id">
      Sykmelding-ID:
      {' '}
      {reisetilskudd.sykmeldingId}
    </Element>
         */
      }
    <Element>
      {reisetilskudd.orgNavn}
      {' '}
      (org.nr
      {reisetilskudd.orgNummer}
      )
    </Element>
    <Vis hvis={reisetilskudd.fom && reisetilskudd.tom}>
      <Element>
        Gjelder perioden fra
        {' '}
        {reisetilskudd.fom ? formatertDato(reisetilskudd.fom, DatoFormat.NATURLIG_LANG) : ''}
        {' '}
        til
        {' '}
        {reisetilskudd.tom ? formatertDato(reisetilskudd.tom, DatoFormat.NATURLIG_LANG) : ''}
      </Element>
    </Vis>
    <HoyreChevron />
    <hr />
  </Link>
);

export default Reisetilskudd;
