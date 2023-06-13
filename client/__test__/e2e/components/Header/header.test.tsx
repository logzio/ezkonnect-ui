import '@testing-library/jest-dom';

import { it, describe, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../../../../src/components/Header';

describe('Header', () => {
    it('renders header with title', async () => {
        await render(<Header />);

        const titleElement = screen.getByRole('title');
        expect(titleElement).toBe('Logz.io EZKonnect™');
    });

    it('renders help item', async () => {
        await render(<Header />);

        const helpMenuItem = screen.getByText('Help');
        expect(helpMenuItem).toBeInTheDocument();
    });
});
