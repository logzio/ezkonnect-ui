/**
 * Converts Error to Readable version of error.
 * @param  {unknown} error
 * @returns {string} Error message
 */
export const getErrorMessage = (error: unknown) => {
	if (error instanceof Error) return error.message
	return String(error)
}
