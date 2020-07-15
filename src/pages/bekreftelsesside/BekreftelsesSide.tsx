import React, { ReactElement } from 'react';
import './bekreftelsesside.less';
import ListeTekstbox from './ListeTekstbox';
import VeienVidereBox from './VeienVidere';

function BekreftelsesSide():ReactElement {
  return (
    <div className="page-wrapper">
      <div className="content-wrapper">
        <ListeTekstbox />
        <VeienVidereBox />
      </div>
    </div>
  );
}

export default BekreftelsesSide;
