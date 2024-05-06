import { writable, type Readable } from 'svelte/store';

type BaseConfirmation = {
	title?: Readable<string>;
	desc?: Readable<string>;
	ok?: Readable<string>;
	cancel?: Readable<string>;
};

type Confirmation = BaseConfirmation & {
	callback: (status: 'success' | 'cancel') => void;
};

export const confirmation = writable<Confirmation | null>(null);

export const confirm = (props: BaseConfirmation = {}) => {
	return new Promise<boolean>((resolve) => {
		confirmation.set({
			...props,
			callback: (status) => {
				resolve(status === 'success');
			}
		});
	});
};
