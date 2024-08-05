import { errorFallback } from '$lib/utils/error/fallback';
import { isUrl } from '$lib/utils/strings/isUrl';

const getSelection = (str: string, selectionStart: number, selectionEnd: number) =>
	[
		str.slice(0, selectionStart),
		str.slice(selectionStart, selectionEnd),
		str.slice(selectionEnd)
	] as const;

export type InsertionFunc = (
	str: string,
	selectionStart: number,
	selectionEnd: number
) => [string, number, number];

const insertHeadingPrivate = (lines: string[], cursorPos: number): string[] => {
	const [firstLine, ...otherLines] = lines;

	if (lines.length === 0) return [];
	if (cursorPos <= firstLine.length) return [`### ${firstLine}`, ...otherLines];

	return [firstLine, ...insertHeadingPrivate(otherLines, cursorPos - (firstLine.length + 1))];
};

export const insertHeading: InsertionFunc = (string, cursorPos) => {
	return [insertHeadingPrivate(string.split('\n'), cursorPos).join('\n'), 4, 4];
};

export const insertBold: InsertionFunc = (str, selectionStart, selectionEnd) => {
	const [preSelection, selection, postSelection] = getSelection(str, selectionStart, selectionEnd);

	return [`${preSelection}**${selection}**${postSelection}`, 2, 2];
};

export const insertItalic: InsertionFunc = (str, selectionStart, selectionEnd) => {
	const [preSelection, selection, postSelection] = getSelection(str, selectionStart, selectionEnd);

	return [`${preSelection}*${selection}*${postSelection}`, 1, 1];
};

export const insertLink: InsertionFunc = (str, selectionStart, selectionEnd) => {
	const [preSelection, selection, postSelection] = getSelection(str, selectionStart, selectionEnd);

	const asTextString = `${preSelection}[${selection}]()${postSelection}`;
	const asUrlString = (title: string) => `${preSelection}[${title}](${selection})${postSelection}`;

	if (selection === '') return [asTextString, 1, 1];
	if (isUrl(selection)) {
		const title = errorFallback(() => new URL(selection).hostname, '');
		return [asUrlString(title), 1, -1 * selection.length + 1 + title.length];
	}
	return [asTextString, selection.length + 3, 3];
};
