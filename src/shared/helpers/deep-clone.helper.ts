export function deepClone<T = unknown>(value: T): T {
	return { ...value };
}
