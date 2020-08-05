import { render } from '@testing-library/react';
import React from 'react';
import App from '../App';

test('renders "Søknad om reisetilskudd"', () => {
  const { getByText } = render(<App />);
  const overskriftsElement = getByText(/Søknad om reisetilskudd/i);
  expect(overskriftsElement).toBeInTheDocument();
});
