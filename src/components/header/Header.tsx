import React, { ReactElement } from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import './header.less';
import busImg from '../../assets/buss.png';
import treImg from '../../assets/tre.png';

function Header():ReactElement {
  return (
    <div className="header">
      <div className="header-content-wrapper">
        <Systemtittel> Søknad om reisetilskudd</Systemtittel>
        <span />
        <span />
        <span />
        <span />
        <span />
        <img src={busImg} alt="bussikon" width="40" />
        <span />
        <img className="treIkon" src={treImg} alt="treikon" width="15" />
      </div>
    </div>
  );
}

export default Header;
