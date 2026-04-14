function isInstalled(...names: string[]): boolean {
	for (const name of names) {
		try {
			// biome-ignore lint/style/noCommonJs: We need dynamic require here.
			require(name);
		} catch {
			return false;
		}
	}

	return true;
}

export { isInstalled };
