export function downloadJSON(data: unknown, filename: string) {
	const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
	const url = URL.createObjectURL(blob);

	const aEle = document.createElement('a');
	aEle.href = url;
	aEle.download = filename;

	aEle.click();
}
