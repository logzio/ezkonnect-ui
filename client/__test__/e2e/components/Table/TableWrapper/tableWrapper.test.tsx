import '@testing-library/jest-dom';

import { it, describe, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';

import TableWrapper, {
    TableContext,
} from '../../../../../src/components/Table/TableWrapper';

describe('TableWrapper', () => {
    it('renders the table wrapper with children and column widths', () => {
        const columnWidths = ['100px', '200px', '150px'];
        const { container, getByText } = render(
            <TableWrapper columnWidths={columnWidths}>
                <span>Child 1</span>
                <span>Child 2</span>
                <span>Child 3</span>
            </TableWrapper>,
        );

        const tableWrapper = container.firstChild as HTMLElement;

        expect(tableWrapper).toBeInTheDocument();

        const tableContextValue = {
            columnWidths,
        };

        expect(getByText('Child 1', { selector: 'span' })).toBeInTheDocument();
        expect(getByText('Child 2', { selector: 'span' })).toBeInTheDocument();
        expect(getByText('Child 3', { selector: 'span' })).toBeInTheDocument();

        expect(tableWrapper).toContainElement(
            getByText('Child 1', { selector: 'span' }),
        );
        expect(tableWrapper).toContainElement(
            getByText('Child 2', { selector: 'span' }),
        );
        expect(tableWrapper).toContainElement(
            getByText('Child 3', { selector: 'span' }),
        );

        // expect(TableContext._currentValue).toEqual(tableContextValue);
    });
});
