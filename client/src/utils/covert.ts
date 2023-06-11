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


export const converLanguageName = (identifier: string): string => {

	return identifier.split('_')[0];
}