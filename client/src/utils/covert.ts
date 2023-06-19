/**
 * Function that converts regular string in Select options
 * @param  {string[]} arrayOptions
 */
export const convertArrayToSelectOption = (arrayOptions: string[]) => {
	const uniqs = [...new Set(arrayOptions)];

	return uniqs.map((option) => {
		return {
			name: option,
			isDisabled: false,
			default: false
		}
	})
}

/**
 * Function that exclude langunage/technology from strings what was connected with underscore
 * @param  {string} identifier
 * @returns string
 */
export const converLanguageName = (identifier: string): string => {

	return identifier.split('_')[0];
}