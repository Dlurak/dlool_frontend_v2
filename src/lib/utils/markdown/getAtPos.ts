import type { Position } from '$lib/components/markdown/types';

export function getAtPos(markdown: string, pos: Position) {
	const lines = markdown.split('\n');

	const getPositionOffset = (pos: Position['start']) =>
		lines.slice(0, pos.line - 1).join('\n').length + (pos.line > 1 ? 1 : 0) + pos.column - 1;

	const startOffset = getPositionOffset(pos.start);
	const endOffset = getPositionOffset(pos.end);

	return markdown.substring(startOffset, endOffset);
}
