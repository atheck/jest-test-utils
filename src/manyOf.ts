function manyOf<T>(creator: (template?: Partial<T>) => T, getTemplate?: (index: number) => Partial<T>): T[] {
	return [creator(getTemplate?.(0)), creator(getTemplate?.(1)), creator(getTemplate?.(2))];
}

export { manyOf };
