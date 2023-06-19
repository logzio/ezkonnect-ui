import '@testing-library/jest-dom';

import { it, describe, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import TableHeaderCell from '../../../../../src/components/Table/TableHeaderCell';

describe('TableHeaderCell', () => {
    it('renders the table header cell with correct styles', () => {
        const { container } = render(<TableHeaderCell>Title</TableHeaderCell>);
        const tableHeaderCellWrapper = container.firstChild as HTMLElement;

        expect(tableHeaderCellWrapper).toBeInTheDocument();
        expect(tableHeaderCellWrapper).toHaveStyle(
            'justify-content: space-between',
        );
        expect(tableHeaderCellWrapper).toHaveStyle('flex-direction: row');
        expect(tableHeaderCellWrapper).toHaveStyle('align-items: center');
        expect(tableHeaderCellWrapper).toHaveStyle('min-height: 45px');
        expect(tableHeaderCellWrapper).toHaveStyle('width: 100%');
        expect(tableHeaderCellWrapper).toHaveStyle('display: flex');
        expect(tableHeaderCellWrapper).toHaveStyle('word-break: break-word');
        expect(tableHeaderCellWrapper).toHaveStyle(
            'border-right: 1px solid rgb(216,216,216)',
        );
    });

    it('renders the title with correct styles', () => {
        const { container } = render(<TableHeaderCell>Title</TableHeaderCell>);
        const titleWrapper = container.querySelector(
            '.cell-title',
        ) as HTMLElement;

        expect(titleWrapper).toBeInTheDocument();
        expect(titleWrapper).toHaveStyle('display: flex');
        expect(titleWrapper).toHaveStyle('padding: 0px 32px');
        expect(titleWrapper).toHaveStyle('min-height: 20px');
        expect(titleWrapper).toHaveStyle('flex: 1 1 170px');
        expect(titleWrapper).toHaveStyle('flex-direction: row');
        expect(titleWrapper).toHaveStyle('line-height: 1.3');
        expect(titleWrapper).toHaveStyle('word-break: break-word');
        expect(titleWrapper).toHaveStyle('font-weight: 500');
        expect(titleWrapper).toHaveStyle('color: rgb(0, 0, 0)');
        expect(titleWrapper).toHaveStyle('min-width: 0px');
        expect(titleWrapper).toHaveStyle('font-size: 14px');
        expect(titleWrapper).toHaveTextContent('Title');
    });
});
