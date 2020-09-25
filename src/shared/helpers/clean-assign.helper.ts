import { deepClone } from './deep-clone.helper';

/**
 * Remove all undefined values from the object source and
 * assign it to target
 * @param target
 * @param source
 */
export function cleanAssign<T, U = Record<string, unknown>>(
	target: T,
	source: U,
): T {
	// this removes all undefined fields
	const copySource = deepClone(source);
	return Object.assign(target, copySource);
}
