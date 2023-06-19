import { it, expect, describe } from 'vitest';
import { IPod, IParsedPodsData } from '../../../src/utils/interfaces';
import { podsArray, typeLogsArray, parsedDataMultiple, parsedDataOneFilter } from '../../mock/data';
import { getAllLogTypes, multipleParseHandler, parseHandler, displayNamespaces } from '../../../src/utils/parsePodData';


describe('getAllLogTypes', () => {
	it('should return an array of unique log types', () => {

		const result = getAllLogTypes(podsArray);

		expect(result).toEqual(typeLogsArray);
	});

	it('should handle empty input array', () => {
		const podsArray: IPod[] = [];

		const expected: string[] = [];
		const result = getAllLogTypes(podsArray);

		expect(result).toEqual(expected);
	});
});

describe('multipleParseHandler', () => {
	it('should parse pods array and return parsed data', () => {

		const filterFieldPrimary = 'language';
		const filterFieldSecondary = 'namespace';
		const filterFieldThird = 'container_name';


		const expected: IParsedPodsData = parsedDataMultiple

		const result = multipleParseHandler(podsArray, filterFieldPrimary, filterFieldSecondary, filterFieldThird);

		expect(result).toEqual(expected);
	});

	it('should handle empty pods array', () => {
		const podsArray: IPod[] = [];
		const filterFieldPrimary = 'language';
		const filterFieldSecondary = 'namespace';
		const filterFieldThird = 'container_name';

		const expected: IParsedPodsData = {};

		const result = multipleParseHandler(podsArray, filterFieldPrimary, filterFieldSecondary, filterFieldThird);

		expect(result).toEqual(expected);
	});
});

describe('parseHandler', () => {
	it('should parse pods array and return parsed data', () => {

		const filterField = 'application';

		const expected: IParsedPodsData = parsedDataOneFilter;
		const result = parseHandler(podsArray, filterField);

		expect(result).toEqual(expected);
	});

	it('should handle empty pods array', () => {
		const podsArray: IPod[] = [];
		const filterField = 'application';

		const expected: IParsedPodsData = {};

		const result = parseHandler(podsArray, filterField);

		expect(result).toEqual(expected);
	});
});


describe('displayNamespaces', () => {
	it('should return a comma-separated list of namespaces if there are 2 or fewer namespaces', () => {
		const namespaces = ['namespace1', 'namespace2'];

		const result = displayNamespaces(namespaces);

		expect(result).toEqual('namespace1, namespace2');
	});

	it('should return a formatted string with "and <count> more" if there are more than 2 namespaces', () => {
		const namespaces = ['namespace1', 'namespace2', 'namespace3', 'namespace4'];

		const result = displayNamespaces(namespaces);

		expect(result).toEqual('namespace1, namespace2 and 2 more.');
	});

	it('should handle an empty array of namespaces and return an empty string', () => {
		const namespaces: string[] = [];

		const result = displayNamespaces(namespaces);

		expect(result).toEqual('');
	});

	it('should handle an array with a single namespace and return the namespace', () => {
		const namespaces = ['namespace1'];

		const result = displayNamespaces(namespaces);

		expect(result).toEqual('namespace1');
	});
});