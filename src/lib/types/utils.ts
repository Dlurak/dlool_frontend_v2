export type RemoveOneValue<T, R> = T extends R ? never : T;
