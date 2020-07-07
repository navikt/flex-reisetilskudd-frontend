import React from "react";
import Stegindikator from 'nav-frontend-stegindikator';
import {sideHjelpetekster} from "../constants/sideIDKonstanter";

// TODO: fix any type
const Brodsmuler = (aktivtSteg: any) => {
    // TODO: Legg på index: på steg
    const steg = Object.entries(sideHjelpetekster).map(([nøkkel, verdi])  => ({label: `${verdi}`, aktiv: (nøkkel === aktivtSteg) ? true : false}));
    console.log(steg);

    return (
        <Stegindikator 
            steg={[
                 {"label": "Dette steget først", index:0},
                 {"label": "Og så dette steget", "aktiv": true, index:1},
                 {"label": "Deretter må du gjøre dette", index:2}
            ]}
            onChange={() => {}}
            visLabel
            autoResponsiv
        />
    )
}

export default Brodsmuler;