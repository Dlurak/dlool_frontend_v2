import { groupBy } from './group';
import { describe, it, expect } from 'vitest';

describe('groupBy function', () => {
	it('should group items by a given key', () => {
		const result = groupBy(
			[
				{ id: 1, name: 'Alice' },
				{ id: 2, name: 'Bob' },
				{ id: 3, name: 'Alice' },
				{ id: 4, name: 'Charlie' }
			],
			({ name }) => name
		);

		expect(result).toEqual({
			Alice: [
				{ id: 1, name: 'Alice' },
				{ id: 3, name: 'Alice' }
			],
			Bob: [{ id: 2, name: 'Bob' }],
			Charlie: [{ id: 4, name: 'Charlie' }]
		});
	});

	it('should handle empty input', () => {
		expect(groupBy([], () => '')).toEqual({});
	});
});
