import React, { ReactElement } from 'react';
import './kvittering-side.less';
import ListeTekstbox from './liste-tekstbox';
import VeienVidereBox from './veien-viderebox';

function KvitteringSide():ReactElement {
  return (
    <div className="page-wrapper">
      <div className="content-wrapper">
        <ListeTekstbox />
        <VeienVidereBox />
      </div>
    </div>
  );
}

export default KvitteringSide;
