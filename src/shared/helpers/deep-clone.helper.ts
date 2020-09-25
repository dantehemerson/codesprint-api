export function deepClone<T = unknown>(value: T): T {
	return JSON.parse(JSON.stringify(value));
}
