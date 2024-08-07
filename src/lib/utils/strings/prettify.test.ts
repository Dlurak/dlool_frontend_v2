import { prettify } from '$lib/utils/strings/prettify';
import { describe, expect, it } from 'vitest';

describe('prettify string', () => {
	it('trims the string', () => {
		expect(prettify('     hi     ')).toEqual('hi');
		expect(prettify('hi          ')).toEqual('hi');
		expect(prettify('          hi')).toEqual('hi');
	});

	it('applies the replacements', () => {
		expect(prettify('Arrow: <-')).toEqual('Arrow: ←');
		expect(prettify('Arrow: ->')).toEqual('Arrow: →');
		expect(prettify('<-> Arrow: <->')).toEqual('↔ Arrow: ↔');

		// Generated by a vim macro
		expect(prettify('<-<')).toEqual('↢');
		expect(prettify('>->')).toEqual('↣');
		expect(prettify('<-|')).toEqual('↤');
		expect(prettify('<->')).toEqual('↔');
		expect(prettify('<-')).toEqual('←');
		expect(prettify('->')).toEqual('→');
		expect(prettify('<~')).toEqual('↜');
		expect(prettify('~>')).toEqual('↝');
	});
});
