import '@testing-library/jest-dom';

import { it, describe, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import TableRow from '../../../../../src/components/Table/TableRow';

describe('TableRow', () => {
    it('renders the table row with default styles', () => {
        const { container } = render(<TableRow>DATA</TableRow>);
        const tableRowWrapper = container.firstChild as HTMLElement;

        expect(tableRowWrapper).toBeInTheDocument();
        expect(tableRowWrapper).toHaveStyle('display: flex');
        expect(tableRowWrapper).toHaveStyle(
            'border-bottom: 1px solid rgb(216, 216, 216)',
        );
        expect(tableRowWrapper).toHaveStyle('justify-content: space-between');
        expect(tableRowWrapper).toHaveStyle('align-items: stretch');
        expect(tableRowWrapper).toHaveStyle('padding: 0px');
        expect(tableRowWrapper).toHaveStyle('background-color: #fff');
        expect(tableRowWrapper).not.toHaveClass('sub-item');
        expect(tableRowWrapper).not.toHaveClass('active');
    });

    it('renders the table row with additional classNames', () => {
        const { container } = render(
            <TableRow classNames='sub-item active'>data</TableRow>,
        );
        const tableRowWrapper = container.firstChild as HTMLElement;

        expect(tableRowWrapper).toHaveClass('sub-item');
        expect(tableRowWrapper).toHaveClass('active');
    });
});
