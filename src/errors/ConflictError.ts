import Error from './Error';

class ConflictError extends Error {
	statusCode: number;

	constructor(message: string) {
		super(message);
		this.statusCode = 409;
	}
}
export default ConflictError;
