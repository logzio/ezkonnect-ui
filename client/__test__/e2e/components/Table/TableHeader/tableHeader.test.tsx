import '@testing-library/jest-dom';

import { it, describe, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import TableHeader from '../../../../../src/components/Table/TableHeader';
import { TableContext } from '../../../../../src/components/Table/TableWrapper';

describe('TableHeader', () => {
    it('renders the table header with correct styles', () => {
        const { container } = render(
            <TableHeader>
                <div className='table-header-cell' />
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
                <div className='table-header-cell' />
                <div className='table-header-cell' />
                <div className='table-header-cell' />
            </TableHeader>,
            {
                wrapper: ({ children }) => (
                    <TableContext.Provider value={{ columnWidths }}>
                        {children}
                    </TableContext.Provider>
                ),
            },
        );

        const tableHeaderCells =
            container.querySelectorAll('.table-header-cell');

        expect(tableHeaderCells).toHaveLength(3);
        tableHeaderCells.forEach((cell, index) => {
            expect(cell).toHaveStyle(`width: ${columnWidths[index]}`);
        });
    });
});
