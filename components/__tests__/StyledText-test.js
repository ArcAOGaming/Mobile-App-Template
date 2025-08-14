import * as React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../contexts/ThemeContext';

import { MonoText } from '../StyledText';

it('renders correctly', () => {
  const { getByText } = render(
    <ThemeProvider>
      <MonoText>Test text</MonoText>
    </ThemeProvider>
  );

  const textElement = getByText('Test text');
  expect(textElement).toBeTruthy();
});
