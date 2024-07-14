import { removeSuffix } from '$lib/utils/strings/removeTrailing';
import { describe, expect, it } from 'vitest';

describe('remove trailing suffix', () => {
	it('does nothing for strins without the suffix', () => {
		expect(removeSuffix('hello', '')).toBe('hello');
		expect(removeSuffix('hello hii', 'hi')).toBe('hello hii');
	});

	it('removes the suffix ones', () => {
		expect(removeSuffix('hi/', '/')).toBe('hi');
		expect(removeSuffix('hi42', '42')).toBe('hi');
	});
	it('removes the suffix often', () => {
		expect(removeSuffix('hi///////////', '/')).toBe('hi');
		expect(removeSuffix('hi42424242424242', '42')).toBe('hi');
	});
});
