import { browser } from '$app/environment';

/**
 * This function enables or disables scrolling on the entire document.
 * @param isEnabled - A boolean value indicating whether scrolling should be enabled (true) or disabled (false).
 */
export function enableScrolling(isEnabled: boolean) {
	if (!browser) return false;
	document.body.style.overflow = isEnabled ? 'initial' : 'hidden';
	return true;
}
