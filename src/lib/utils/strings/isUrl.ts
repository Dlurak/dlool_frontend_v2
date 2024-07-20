import { z } from 'zod';

export function isUrl(str: string) {
	return z.string().url().safeParse(str).success;
}
