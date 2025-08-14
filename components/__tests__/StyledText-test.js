import * as React from 'react';
import { render } from '@testing-library/react-native';

import { MonoText } from '../StyledText';

it('renders correctly', () => {
  const { getByText } = render(<MonoText>Test text</MonoText>);

  const textElement = getByText('Test text');
  expect(textElement).toBeTruthy();
});
