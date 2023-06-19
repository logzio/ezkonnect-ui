import { it, expect, describe } from 'vitest';

import { convertArrayToSelectOption, converLanguageName } from '../../../src/utils/covert'
import { ListType } from '../../../src/utils/interfaces';


describe('convertArrayToSelectOption', () => {
	it('should convert array options to select options', () => {
		const arrayOptions: string[] = ['cat', 'dog', 'cat', 'star', 'hello', 'world'];
		const expected: ListType[] = [
			{ name: 'cat', isDisabled: false, default: false },
			{ name: 'dog', isDisabled: false, default: false },
			{ name: 'star', isDisabled: false, default: false },
			{ name: 'hello', isDisabled: false, default: false },
			{ name: 'world', isDisabled: false, default: false }
		];

		const result = convertArrayToSelectOption(arrayOptions);

		expect(result).toEqual(expected);
	});
});


describe('converLanguageName', () => {
	it('should convert identifier to language name', () => {
		const identifier = 'en_US';
		const expected = 'en';

		const result = converLanguageName(identifier);

		expect(result).toEqual(expected);
	});

	it('should handle identifier without underscore', () => {
		const identifier = 'fr';
		const expected = 'fr';

		const result = converLanguageName(identifier);

		expect(result).toEqual(expected);
	});
});
