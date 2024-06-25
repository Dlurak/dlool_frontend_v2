import type { Action } from 'svelte/action';

export const gradientText: Action = (node) => {
	node.style.backgroundImage = 'linear-gradient(to right, #68D391, #38B2AC)';
	node.style.backgroundClip = 'text';
	node.style.color = 'transparent';

	const setToBlack = () => (node.style.color = 'black');
	const setToTransparent = () => (node.style.color = 'transparent');

	window.addEventListener('beforeprint', setToBlack);
	window.addEventListener('afterprint', setToTransparent);

	return {
		destroy() {
			window.removeEventListener('beforeprint', setToBlack);
			window.removeEventListener('afterprint', setToTransparent);
		}
	};
};
