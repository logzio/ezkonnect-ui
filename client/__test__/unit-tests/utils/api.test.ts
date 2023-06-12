import { it, expect, describe, beforeEach, vitest } from 'vitest';
import { Api } from '../../../src/utils/api';
import { IItemToSend } from '../../../src/utils/interfaces';
import { itemsToSend } from '../../mock/data';

describe('Api', () => {
	let api;

	beforeEach(() => {
		api = new Api('http://localhost:8080/');
	});

	describe('customFetch', () => {
		it('should make a custom fetch request and return the response data', async () => {
			const method = 'POST';
			const url = 'api/test/url';
			const bodyToSend = { key: 'value' };
			const expectedResponse = { success: true };

			global.fetch = vitest.fn().mockResolvedValue({
				ok: true,
				json: vitest.fn().mockResolvedValue(expectedResponse),
			});

			const result = await api.customFetch(method, url, bodyToSend);

			expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/test/url', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(bodyToSend),
			});
			expect(result).toEqual(expectedResponse);
		});

		it('should handle fetch errors and return the error response', async () => {
			const method = 'GET';
			const url = 'api/test/url';
			const bodyToSend = {};
			const expectedError = new Error('Fetch error');

			global.fetch = vitest.fn().mockRejectedValue(expectedError);

			const result = await api.customFetch(method, url, bodyToSend);

			expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/test/url', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			expect(result).toEqual(expectedError);
		});
	});

	describe('getPods', () => {
		it('should make a GET request to get pods and return the data', async () => {
			const expectedData = [{ name: 'pod1' }, { name: 'pod2' }];

			global.fetch = vitest.fn().mockResolvedValue({
				ok: true,
				json: vitest.fn().mockResolvedValue(expectedData),
			});

			const result = await api.getPods();

			expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/test/state', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			expect(result).toEqual(expectedData);
		});
	});

	describe('updatePod', () => {
		it('should make a POST request to update pods and return the data', async () => {
			const podData: IItemToSend[] = itemsToSend;
			const expectedData = { success: true };

			global.fetch = vitest.fn().mockResolvedValue({
				ok: true,
				json: vitest.fn().mockResolvedValue(expectedData),
			});

			const result = await api.updatePod(podData);

			expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/test/annotate/traces', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(podData),
			});
			expect(result).toEqual(expectedData);
		});
	});

	describe('updateLogPod', () => {
		it('should make a POST request to update log pods and return the data', async () => {
			const podData: IItemToSend[] = itemsToSend;
			const expectedData = { success: true };

			global.fetch = vitest.fn().mockResolvedValue({
				ok: true,
				json: vitest.fn().mockResolvedValue(expectedData),
			});

			const result = await api.updateLogPod(podData);

			expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/test/annotate/logs', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(podData),
			});
			expect(result).toEqual(expectedData);
		});

		it('should handle fetch errors and return the error message', async () => {
			const podData: IItemToSend[] = itemsToSend;
			const expectedError = new Error('Fetch error');

			global.fetch = vitest.fn().mockRejectedValue(expectedError);

			const result = await api.updateLogPod(podData);

			expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/test/annotate/logs', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(podData),
			});
			expect(result).toEqual(expectedError.message);
		});
	});
});