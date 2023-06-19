import '@testing-library/jest-dom';

import { it, describe, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Tag from '../../../../src/components/Tag';

describe('Tag', () => {
    it('renders the tag with the provided color', () => {
        const color = '#f7c15c';
        render(<Tag color={color}>Example Tag</Tag>);
        const tagElement = screen.getByText('Example Tag');
        expect(tagElement).toHaveStyle(`background:${color}`);
    });

    it('renders the tag with the default color when no color is provided', () => {
        render(<Tag>Example Tag</Tag>);
        const tagElement = screen.getByText('Example Tag');
        expect(tagElement).toHaveStyle('background:#e7e7e7');
    });
});
