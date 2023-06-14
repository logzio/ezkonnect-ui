import '@testing-library/jest-dom';
import React from 'react';
import { it, describe, expect } from 'vitest';
import { render } from '@testing-library/react';
import LanguageLogo from '../../../../src/containers/LanguageLogo';

describe('LanguageLogo', () => {
    it('renders the correct language logo based on the identifier', () => {
        const { container } = render(<LanguageLogo identifier='python' />);
        const pythonLogo = container.querySelector(
            'img[src="python-logo.svg"]',
        );

        expect(pythonLogo).toBeInTheDocument();
    });

    it('renders an empty component when the identifier is not recognized', () => {
        const { container } = render(<LanguageLogo identifier='unknown' />);
        const emptyComponent = container.firstChild;

        expect(emptyComponent).toBeNull();
    });

    // Add more test cases as needed
});
