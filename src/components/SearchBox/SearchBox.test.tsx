import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchBox from './SearchBox';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SearchBox Component', () => {
  const setSearchParamMock = jest.fn();
  const mockPush = jest.fn(); 
  beforeEach(() => {
    jest.clearAllMocks();
    
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('should render with the initial search value', () => {
    render(
      <SearchBox
        total={10}
        initialValue=''
      />
    );

    const input = screen.getByPlaceholderText('search character...') as HTMLInputElement;

    expect(input.value).toBe('');
    expect(screen.getByText('10 RESULTS')).toBeDefined();
  });

  it.skip('should call setSearchParam with the right value', () => {
    render(
      <SearchBox
        total={10}
        initialValue=''
      />
    );

    const input = screen.getByTestId('search-text-input') as HTMLInputElement;
    
    act(() => {
      fireEvent.change(input, { target: { value: 'new value' } });
    });

    expect(setSearchParamMock).toHaveBeenCalledWith('new value');
  });
});
