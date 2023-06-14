import '@testing-library/jest-dom';

import { it, describe, expect, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Cell from '../../../../../src/components/Table/Cell';

describe('Cell', () => {
    it('renders the cell with correct styles and content', () => {
        render(
            <Cell
                width='200px'
                color='#FF0000'
                display='flex'
                flexDirection='column'
            >
                <span>Content</span>
            </Cell>,
        );

        const cellElement = screen.getByText('Content');
        expect(cellElement).toBeInTheDocument();
        expect(cellElement.parentElement).toHaveStyle('padding: 32px');
        expect(cellElement.parentElement).toHaveStyle('background-color: #fff');
        expect(cellElement.parentElement).toHaveStyle('flex: 1 200px');
        expect(cellElement.parentElement).toHaveStyle('display: flex');
        expect(cellElement.parentElement).toHaveStyle('align-items: center');
        expect(cellElement.parentElement).toHaveStyle('color: #FF0000');
        expect(cellElement.parentElement).toHaveStyle('flex-direction: column');
    });

    it('calls the onClick function when clicked', () => {
        const handleClick = vi.fn();
        render(
            <Cell onClick={handleClick}>
                <span>Content</span>
            </Cell>,
        );

        const cellElement = screen.getByText('Content');
        cellElement.click();
        expect(handleClick).toHaveBeenCalled();
    });
});
