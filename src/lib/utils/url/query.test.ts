import { objToQueryParams } from '$lib/utils/url/query';
import { describe, it, expect } from 'vitest';

describe('object to query params', () => {
	it('converts a Record<string, string | number>', () => {
		expect(objToQueryParams({})).toBe('');
		expect(objToQueryParams({ key: 'value' })).toBe('key=value');
		expect(objToQueryParams({ key: 'value', key2: 'value2' })).toBe('key=value&key2=value2');
		expect(objToQueryParams({ key: 'value', key2: 42 })).toBe('key=value&key2=42');
	});
	it('converts a handles null', () => {
		expect(objToQueryParams({ key: null })).toBe('');
		expect(objToQueryParams({ key: 'value', key2: 'value2' })).toBe('key=value&key2=value2');
		expect(objToQueryParams({ key: 'value', key2: null })).toBe('key=value');
	});
	it('converts a Record<string, Record<string, unknown>>', () => {
		const obj = { key: { key: { key: { key: [4, 2.42, { key: { value: 'hi' } }] } } } };

		expect(objToQueryParams({ key: obj, key2: 'value2' })).toBe(
			`key=${encodeURIComponent(JSON.stringify(obj))}&key2=value2`
		);
	});
});
