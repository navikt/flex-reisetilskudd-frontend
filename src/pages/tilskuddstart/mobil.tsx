import React from 'react'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import Veilederpanel from 'nav-frontend-veilederpanel'

const Mobil = () => {
    return (
        <div className="spar-tid">
            <Veilederpanel kompakt svg={<svg width="29" height="50" viewBox="0 0 29 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M25.8144 50H3.1856C1.42546 50 0 48.5898 0 46.8497V3.14934C0 1.41024 1.42546 0 3.1856 0H25.8144C27.5745 0 29 1.41024 29 3.14934V46.8497C29 48.5898 27.5745 50 25.8144 50Z" fill="#B7B1A9" />
                <rect width="25" height="40" transform="translate(2 2)" fill="white" />
                <rect x="3" y="3" width="23" height="13" fill="#C2EAF7" />
                <path fillRule="evenodd" clipRule="evenodd" d="M4 20H25V22H4V20Z" fill="#E7E9E9" />
                <path fillRule="evenodd" clipRule="evenodd" d="M4 25H25V27H4V25Z" fill="#E7E9E9" />
                <path fillRule="evenodd" clipRule="evenodd" d="M4 30H25V32H4V30Z" fill="#E7E9E9" />
                <path fillRule="evenodd" clipRule="evenodd" d="M17 46C17 47.1045 16.1051 48 14.9995 48C13.8959 48 13 47.1045 13 46C13 44.8955 13.8959 44 14.9995 44C16.1051 44 17 44.8955 17 46Z" fill="#78706A" />
            </svg>
            }>
                <Undertittel>Spar tid ved å bruke mobilen</Undertittel>
                <Normaltekst>Om du gjennomfører søknaden på mobilen, kan du ta bilde av kvitteringen direkte når du laster opp kvitteringer for reiser.</Normaltekst>
            </Veilederpanel>
        </div>
    )
}

export default Mobil
