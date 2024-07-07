import type { generateAst } from '$lib/utils/markdown/parse';

export type Root = ReturnType<typeof generateAst>;
export type RootContent = Root['children'][number];
export type Position = NonNullable<RootContent['position']>;

type SubNodes<T> = T | T extends { children: unknown[] } ? T['children'][number] : never;

export type Node = SubNodes<RootContent> | RootContent;
