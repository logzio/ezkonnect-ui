import '@testing-library/jest-dom';

import React from 'react';
import { it, describe, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Select from '../../../../src/components/Select';
import { ListType } from '../../../../src/utils/interfaces';

describe('Select component', () => {
    const options: ListType[] = [
        { name: 'Option 1', default: false, isDisabled: false },
        { name: 'Option 2', default: true, isDisabled: false },
        { name: 'Option 3', default: false, isDisabled: true },
    ];

    it('renders select component with options', () => {
        const onChangeSelectMock = vi.fn();
        const currentValue = 'Option 2';
        const placeHolder = 'Select an option';
        const maxWidthSelect = '150px';

        render(
            <Select
                options={options}
                onChangeSelect={onChangeSelectMock}
                currentValue={currentValue}
                placeHolder={placeHolder}
                maxWidthSelect={maxWidthSelect}
            />,
        );
        const currentVal = screen.getAllByText(currentValue)[0] as HTMLElement;

        // Assert that the current value is displayed
        expect(currentVal).toBeInTheDocument();

        // Assert that the placeholder is displayed when the current value is empty
        const emptyCurrentValue = '';
        render(
            <Select
                options={options}
                onChangeSelect={onChangeSelectMock}
                currentValue={emptyCurrentValue}
                placeHolder={placeHolder}
                maxWidthSelect={maxWidthSelect}
            />,
        );
        expect(screen.getByText(placeHolder)).toBeInTheDocument();

        // Simulate clicking the select component to open the dropdown
        const labelSelect = currentVal;
        fireEvent.click(labelSelect);

        // Assert that the dropdown is displayed
        const dropdownList = screen.getByRole('list');
        expect(dropdownList).toBeInTheDocument();

        // Assert that all options are rendered
        options.forEach((option) => {
            const element = screen.getAllByText(option.name)[0] as HTMLElement;
            expect(element).toBeInTheDocument();
        });

        // Simulate selecting an option
        const optionToSelect = options[1];
        const optionElement = screen.getAllByText(
            optionToSelect.name,
        )[0] as HTMLElement;
        fireEvent.click(optionElement);
			
        // expect(onChangeSelectMock).toHaveBeenCalledWith(optionToSelect.name);
    });
});
