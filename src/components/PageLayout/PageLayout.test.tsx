import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PageLayout from './PageLayout';
import { mockCharacters } from '@utils/__mocks__/mock-characters';

describe('[[PageLayout Test]]', () => {
    const mockFetchCharacters = jest.fn(() =>
        Promise.resolve(mockCharacters)
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render loading state initially', async () => {
        render(<PageLayout fetchCharacters={mockFetchCharacters} />);
        
        expect(screen.getByTestId('circular-loader-test-id')).toBeDefined();
    });

    it('should render the page title', async () => {
        render(<PageLayout pageTitle="Test Page" fetchCharacters={mockFetchCharacters} />);
        
        await waitFor(() => {
            expect(screen.getByText('Test Page')).toBeDefined();
        });
    });

    it('should fetch and display characters', async () => {
        render(<PageLayout fetchCharacters={mockFetchCharacters} />);
        
        await waitFor(() => {
            expect(mockFetchCharacters).toHaveBeenCalled();
            expect(screen.getByText('3-D Man')).toBeDefined();
            expect(screen.getByText('A-Bomb (HAS).')).toBeDefined();
            expect(screen.getByText('A.I.M.')).toBeDefined();
        });
    });

    it('should update search param and call fetchCharacters with it', async () => {
        render(<PageLayout fetchCharacters={mockFetchCharacters} />);

        
        await waitFor(() => {
            const input = screen.getByPlaceholderText('search character...');
            
            expect(input).toBeDefined();

            act(() => {
                fireEvent.change(input, { target: { value: 'new value' } });
              });

            expect(mockFetchCharacters).toHaveBeenLastCalledWith('new value');
        });
    });
});
