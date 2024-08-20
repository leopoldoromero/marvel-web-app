import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchBox from './SearchBox';

describe('SearchBox Component', () => {
  const setSearchParamMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render with the initial search value', () => {
    render(
      <SearchBox
        total={10}
        setSearchParam={setSearchParamMock}
        value=""
      />
    );

    const input = screen.getByPlaceholderText('search character...') as HTMLInputElement;

    expect(input.value).toBe('');
    expect(screen.getByText('10 RESULTS')).toBeDefined();
  });

  it('should call setSearchParam with the right value', () => {
    render(
      <SearchBox
        total={10}
        value=''
        setSearchParam={setSearchParamMock}
      />
    );

    const input = screen.getByTestId('search-text-input') as HTMLInputElement;
    
    act(() => {
      fireEvent.change(input, { target: { value: 'new value' } });
    });

    expect(setSearchParamMock).toHaveBeenCalledWith('new value');
  });
});
