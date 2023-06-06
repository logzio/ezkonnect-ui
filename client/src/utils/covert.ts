export const convertArrayToSelectOption = (arrayOptions: string[]) => {
	return arrayOptions.map((option) => {
		return {
			name: option,
			isDisabled: false,
			default: false
		}
	})
}
