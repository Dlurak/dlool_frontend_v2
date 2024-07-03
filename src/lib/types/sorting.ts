import type { AssignmentProps } from '$lib/dlool/assignments/list';
import type { RemoveOneValue } from '$lib/types/utils';

export type OrderKey = RemoveOneValue<AssignmentProps['orderKey'], undefined>;
export type SortOrder = 'asc' | 'desc';
