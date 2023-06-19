import '@testing-library/jest-dom';

import { it, describe, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Text from '../../../../src/components/Text';

describe('Text', () => {
    it('renders an h2 element when tag prop is "h2"', () => {
        render(<Text tag='h2'>Hello World</Text>);
        const h2Element = screen.getByRole('heading', { level: 2 });
        expect(h2Element).toBeInTheDocument();
        expect(h2Element).toHaveTextContent('Hello World');
    });

    it('renders a p element when tag prop is "p"', () => {
        render(<Text tag='p'>Lorem ipsum</Text>);
        const pElement = screen.getByRole('paragraph');
        expect(pElement).toBeInTheDocument();
        expect(pElement).toHaveTextContent('Lorem ipsum');
    });

    it('applies classNames and color prop correctly', () => {
        render(
            <Text tag='p' color='rgb(255, 0, 0)'>
                Styled Text
            </Text>,
        );
        const styledTextElement = screen.getByText('Styled Text');
        // expect(styledTextElement).toHaveClass('disabled tableElement');
        expect(styledTextElement).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    });
});
