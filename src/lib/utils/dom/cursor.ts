export function getCursorPixelPosition(textarea: HTMLTextAreaElement) {
	const cursorPosition = textarea.selectionStart;

	const span = document.createElement('span');
	span.textContent = textarea.value.substring(0, cursorPosition);

	// Set up the span element to mimic the textarea's text styling
	span.style.position = 'absolute';
	span.style.visibility = 'hidden';
	span.style.whiteSpace = 'pre-wrap'; // Mimic the textarea's white space handling
	span.style.font = window.getComputedStyle(textarea).font;

	document.body.appendChild(span);

	const spanRect = span.getBoundingClientRect();

	// Clean up
	document.body.removeChild(span);

	return {
		x: spanRect.width,
		y: spanRect.height
	};
}
