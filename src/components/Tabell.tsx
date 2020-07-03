import 'nav-frontend-tabell-style';
import Lenke from 'nav-frontend-lenker';
import React, { ReactElement } from 'react';

function Tabell() : ReactElement {
  return (
    <table className="tabell">
      <thead>
        <tr>
          <th role="columnheader" aria-sort="none"><Lenke href="#">ID</Lenke></th>
          <th role="columnheader" aria-sort="descending" className="tabell__th--sortert-desc"><Lenke href="#">Fødselsnummer</Lenke></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>3</td>
          <td className="tabell__td--sortert">Geordi</td>
        </tr>
        <tr>
          <td>1</td>
          <td className="tabell__td--sortert">Jean-Luc</td>
        </tr>
        <tr>
          <td>2</td>
          <td className="tabell__td--sortert">William</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Tabell;
