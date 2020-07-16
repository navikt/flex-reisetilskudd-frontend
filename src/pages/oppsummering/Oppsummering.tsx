import React, { ReactElement } from 'react';
import FilMedInfo from '../../components/filopplaster/FilMedInfo';

const eksempelFil = {
  navn: "fil.jpg",
  størrelse: 290,
  beløp: 500,
  dato: new Date(),
}

const eksempelFil2 = {
  navn: "fil23.jpg",
  størrelse: 250,
  beløp: 500,
  dato: new Date(),
}

const filer = [eksempelFil, eksempelFil2]

function Oppsummering():ReactElement {
  return (
    <>
    {filer.map((fil) =>
     (<FilMedInfo fil={fil} />)
    )}
    </>
  );
}

export default Oppsummering;
