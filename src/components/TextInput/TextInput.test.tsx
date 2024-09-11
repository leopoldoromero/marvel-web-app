import React from 'react';
import { render, screen } from '@testing-library/react';
import TextInput from './TextInput';

describe('[[TestInput Test]]', () => {
  it('should render the input correctly with its props', () => {
    const mockPlaceholder = 'Search...'
    const mockValue = 'abc'
    render(<TextInput placeholder={mockPlaceholder} value={mockValue}/>)

    const input = screen.getByPlaceholderText(mockPlaceholder) as HTMLInputElement;

    expect(input).toBeDefined();
    expect(input.value).toBe(mockValue);
  });
});
