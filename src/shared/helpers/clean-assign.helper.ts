/**
 * Remove all undefined values from the object source and
 * assign it to target
 * @param target
 * @param source
 */
export function cleanAssign<T, U = object>(target: T, source: U): T {
	// this removes all undefined fields
	const copySource = JSON.parse(JSON.stringify(source))
	return Object.assign(target, copySource)
}
