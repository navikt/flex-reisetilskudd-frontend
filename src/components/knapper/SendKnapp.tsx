import React, { ReactElement } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { useHistory } from 'react-router-dom';
import './knapper.less';

const SendKnapp = (): ReactElement => {
  const history = useHistory();

  function handleClick() {
    history.push('/bekreftelse');
  }

  return (
    <div className="videre-knapp">
      <Knapp className="send-knapp" type="hoved" onClick={() => handleClick()}>Send inn søknad</Knapp>
    </div>
  );
};

export default SendKnapp;
