import '@testing-library/jest-dom';

import { it, describe, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../../../../src/components/Header';

describe('Header', () => {
    it('renders header with title', async () => {
        render(<Header />);

        const titleElement = screen.getByText('Logz.io EZKonnect™');
        expect(titleElement).toBeInTheDocument();
    });

    it('renders help item', async () => {
        render(<Header />);

        const helpMenuItem = screen.getByText('Help');
        expect(helpMenuItem).toBeInTheDocument();
    });
});
