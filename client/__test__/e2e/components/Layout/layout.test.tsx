import React from 'react';
import { render, screen } from '@testing-library/react';
import { it, describe, expect } from 'vitest';

import Layout from '../../../../src/components/Layout';

describe('Layout component', () => {
    it('renders children and status container', () => {
        render(<Layout>Hello World</Layout>);

        // Assert that the header component is rendered
        expect(screen.getByText('Logz.io EZKonnect™')).toBeInTheDocument();

        // Assert that the children are rendered
        expect(screen.getByText('Hello World')).toBeInTheDocument();
    });
});
