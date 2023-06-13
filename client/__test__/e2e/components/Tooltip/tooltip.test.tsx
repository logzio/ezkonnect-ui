import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { it, describe, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Tooltip from '../../../../src/components/Tooltip';

describe('Tooltip', () => {
    it('renders the tooltip icon', () => {
        render(<Tooltip message='Hello' />);
        const iconElement = screen.getByTestId('icon');
        expect(iconElement).toBeInTheDocument();
    });

    it('displays the tooltip message on hover', () => {
        render(<Tooltip message='Hello' />);
        const tooltipMessage = screen.getByTestId('tooltip-message');
        expect(tooltipMessage).toHaveStyle({ display: 'none' });

        const tooltipWrapper = screen.getByTestId('tooltip');
        // tooltipWrapper.dispatchEvent(
        //     new MouseEvent('mouseenter', { bubbles: true }),
        // );
        userEvent.hover(tooltipWrapper);
        expect(tooltipMessage).toHaveStyle({ background: 'rgb(26, 66, 81)' });

        // tooltipWrapper.dispatchEvent(
        //     new MouseEvent('mouseleave', { bubbles: true }),
        // );
        expect(tooltipMessage).toHaveStyle({ display: 'none' });
    });
});
