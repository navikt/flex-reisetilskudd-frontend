import React, { ReactElement } from 'react';
import './bekreftelsesside.less';
import ListeTekstbox from './ListeTekstbox';
import VeienVidereBox from './VeienVidere';

function BekreftelsesSide():ReactElement {
  return (
    <div className="bekreftelsesside-page-wrapper">
      <ListeTekstbox />
      <VeienVidereBox />
    </div>
  );
}

export default BekreftelsesSide;
