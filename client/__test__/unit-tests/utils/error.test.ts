import { it, expect, describe } from 'vitest';
import { getErrorMessage } from '../../../src/utils/error';

describe('getErrorMessage', () => {
	it('returns the error message when the input is an instance of Error', () => {
		const error = new Error('Something went wrong');
		const errorMessage = getErrorMessage(error);
		expect(errorMessage).toBe('Something went wrong');
	});

	it('returns the string representation of the input when it is not an instance of Error', () => {
		const error = 'An error occurred';
		const errorMessage = getErrorMessage(error);
		expect(errorMessage).toBe('An error occurred');
	});

	it('returns an empty string when the input is null or undefined', () => {
		const errorMessageNull = getErrorMessage(null);
		expect(errorMessageNull).toBe('');

		const errorMessageUndefined = getErrorMessage(undefined);
		expect(errorMessageUndefined).toBe('');
	});
});