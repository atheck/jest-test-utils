function manyOf<TData>(creator: (template?: Partial<TData>) => TData, getTemplate?: (index: number) => Partial<TData>): TData[] {
	return [creator(getTemplate?.(0)), creator(getTemplate?.(1)), creator(getTemplate?.(2))];
}

export { manyOf };
