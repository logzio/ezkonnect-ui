import 'dotenv/config'

export const config: {
	port: number;
} = {
	port: Number(process.env.PORT) || 8080,
};
