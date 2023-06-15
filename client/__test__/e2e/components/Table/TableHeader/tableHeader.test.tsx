import '@testing-library/jest-dom';

import { it, describe, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import TableHeader from '../../../../../src/components/Table/TableHeader';
import TableHeaderCell from '../../../../../src/components/Table/TableHeaderCell';

import { TableContext } from '../../../../../src/components/Table/TableWrapper';

describe('TableHeader', () => {
    it('renders the table header with correct styles', () => {
        const { container } = render(
            <TableHeader>
                <TableHeaderCell>Title</TableHeaderCell>
            </TableHeader>,
        );
        const tableHeaderWrapper = container.firstChild as HTMLElement;

        expect(tableHeaderWrapper).toBeInTheDocument();
        expect(tableHeaderWrapper).toHaveStyle(
            'background: rgba(216,216,216, 0.2)',
        );
        expect(tableHeaderWrapper).toHaveStyle(
            'border: 1px solid rgb(216,216,216)',
        );
        expect(tableHeaderWrapper).toHaveStyle('display: flex');
        expect(tableHeaderWrapper).toHaveStyle(
            'justify-content: space-between',
        );
        expect(tableHeaderWrapper).toHaveStyle('padding: 0px');
    });

    it('applies the correct widths to table header cells', () => {
        const columnWidths = ['100px', '200px', '150px'];
        const { container } = render(
            <TableHeader>
                <TableHeaderCell>Title 1</TableHeaderCell>
                <TableHeaderCell>Title 2</TableHeaderCell>
                <TableHeaderCell>Title 3</TableHeaderCell>
            </TableHeader>,
            {
                wrapper: ({ children }) => (
                    <TableContext.Provider value={{ columnWidths }}>
                        {children}
                    </TableContext.Provider>
                ),
            },
        );

        const tableHeaderCells = container.querySelectorAll('.cell');

        expect(tableHeaderCells).toHaveLength(3);
        tableHeaderCells.forEach((cell, index) => {
            expect(cell).toHaveStyle(`flex: 1 ${columnWidths[index]}`);
        });
    });
});
