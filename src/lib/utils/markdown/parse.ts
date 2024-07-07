import { remark } from 'remark';
import remarkGfm from 'remark-gfm';

const parser = remark().use(remarkGfm);

export function generateAst(markdown: string) {
	return parser.parse(markdown);
}
