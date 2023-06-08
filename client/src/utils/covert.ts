export const convertArrayToSelectOption = (arrayOptions: string[]) => {
	return arrayOptions.map((option) => {
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