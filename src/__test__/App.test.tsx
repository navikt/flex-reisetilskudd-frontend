import { render } from '@testing-library/react'
import React from 'react'

import Happ from '../App'

test('renders "Søknad om reisetilskudd"', () => {
    const { getByText } = render(<Happ />)
    const overskriftsElement = getByText(/Søknad om reisetilskudd/i)
    expect(overskriftsElement).toBeInTheDocument()
})
