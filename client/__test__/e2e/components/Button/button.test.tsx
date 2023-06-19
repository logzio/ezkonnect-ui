import '@testing-library/jest-dom';
import React from 'react';
import { it, describe, expect, vitest } from 'vitest';
import Button from '../../../../src/components/Button';
import { render, fireEvent } from '@testing-library/react';

describe('Button component', () => {
    it('should render the button with the provided children', () => {
        const { getByText } = render(
            <Button
                onClick={() => {
                    console.log('clicked');
                }}
                color='yellow'
            >
                Click me
            </Button>,
        );
        const buttonElement = getByText('Click me');
        expect(buttonElement).toBeInTheDocument();
    });

    it('should call the onClick handler when the button is clicked', () => {
        const handleClick = vitest.fn();
        const { getByText } = render(
            <Button color='yellow' onClick={handleClick}>
                Click me
            </Button>,
        );
        const buttonElement = getByText('Click me');
        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should disable the button if the disabled prop is true', () => {
        const { getByText } = render(
            <Button
                color='yellow'
                disabled
                onClick={() => {
                    console.log('clicked');
                }}
            >
                Click me
            </Button>,
        );
        const buttonElement = getByText('Click me');
        expect(buttonElement).toBeDisabled();
    });

    it('should display the hint message when provided', () => {
        const { getByText, getByTestId } = render(
            <Button
                color='yellow'
                hintMessage='This is a hint'
                onClick={() => {
                    console.log('clicked');
                }}
            >
                Click me
            </Button>,
        );
        const buttonElement = getByText('Click me');
        fireEvent.mouseOver(buttonElement);
        const hintMessageElement = getByTestId('hint-message');
        expect(hintMessageElement).toHaveTextContent('This is a hint');
    });
});
