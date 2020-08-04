import React, { ReactElement } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { AktivtStegProps } from '../../types/navigasjonTypes';
import './knapper.less';

function VidereKnapp(
  { onClick } : AktivtStegProps,
): ReactElement {
  function handleClick() {
    if (onClick) {
      onClick();
    }
  }

  return (
    <div className="videre-knapp">
      <Knapp type="hoved" onClick={() => handleClick()}>Gå videre</Knapp>
    </div>
  );
}

export default VidereKnapp;
