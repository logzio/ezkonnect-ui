import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { it, describe, expect, vitest } from 'vitest';

import { render, fireEvent, waitFor } from '@testing-library/react';
import InputSelect from '../../../../src/components/InputSelect';

describe('InputSelect', () => {
    const options = [
        { name: 'Option 1', default: false, isDisabled: false },
        { name: 'Option 2', default: false, isDisabled: false },
        { name: 'Option 3', default: true, isDisabled: true },
    ];

    it('should render options correctly', () => {
        const { getByText } = render(
            <InputSelect
                options={options}
                onChangeSelect={vitest.fn()}
                onChangeValue={vitest.fn()}
                currentValue=''
                placeHolder='Select an option'
            />,
        );

        const option1 = getByText('Option 1');
        const option2 = getByText('Option 2');
        const option3 = getByText('Option 3');

        expect(option1).toBeInTheDocument();
        expect(option2).toBeInTheDocument();
        expect(option3).toBeInTheDocument();
    });

    it('should trigger onChangeSelect when an option is selected', async () => {
        const onChangeSelect = vitest.fn();

        const { getByText } = render(
            <InputSelect
                options={options}
                onChangeSelect={onChangeSelect}
                onChangeValue={vitest.fn()}
                currentValue=''
                placeHolder='Select an option'
            />,
        );

        const option1 = getByText('Option 1');
        fireEvent.click(option1);

        await waitFor(() => {
            expect(onChangeSelect).toHaveBeenCalledWith('Option 1');
        });
    });

    it('should trigger onChangeValue when input value changes', async () => {
        const onChangeValue = vitest.fn();

        const { getByRole } = render(
            <InputSelect
                options={options}
                onChangeSelect={vitest.fn()}
                onChangeValue={onChangeValue}
                currentValue=''
                placeHolder='Select an option'
            />,
        );

        const input = getByRole('textbox');
        fireEvent.change(input, { target: { value: 'Test' } });

        await waitFor(() => {
            expect(onChangeValue).toHaveBeenCalled();
        });
    });

    it('should display the selected option', () => {
        const { getByText } = render(
            <InputSelect
                options={options}
                onChangeSelect={vitest.fn()}
                onChangeValue={vitest.fn()}
                currentValue='Option 1'
                placeHolder='Select an option'
            />,
        );

        const selectedOption = getByText('Option 1');

        expect(selectedOption).toBeInTheDocument();
    });

    it('should display the placeholder if no option is selected', () => {
        const { getByText } = render(
            <InputSelect
                options={options}
                onChangeSelect={vitest.fn()}
                onChangeValue={vitest.fn()}
                currentValue=''
                placeHolder='Select an option'
            />,
        );

        const placeholder = getByText('Select an option');

        expect(placeholder).toBeInTheDocument();
    });
});
