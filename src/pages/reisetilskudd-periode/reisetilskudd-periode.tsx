import React from 'react';
import Filopplaster from '../../components/filopplaster/Filopplaster';

const ReiseTilskuddPeriode = () => {
    return(
        <div>
            <Filopplaster
                tillatteFiltyper={['image/png', 'image/jpeg']}
                maxFilstørrelse={1024 * 1024}
            />
        </div>
    )
}

export default ReiseTilskuddPeriode;