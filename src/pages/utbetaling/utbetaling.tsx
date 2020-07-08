import React, { ReactElement } from 'react';

import { Undertittel } from 'nav-frontend-typografi';
import RadioPG from '../../components/sporsmal/Sporsmal';

function Utbetaling(): ReactElement {
  return (
    <div>
      <Undertittel>
        Utbetaling
      </Undertittel>
      <RadioPG />
    </div>
  );
}

export default Utbetaling;
