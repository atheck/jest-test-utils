import nodeWithBiome from "eslint-config-heck/nodeWithBiome";

const config = [
	{
		ignores: ["*.js", "*.mjs"],
	},
	...nodeWithBiome,
];

// biome-ignore lint/style/noDefaultExport: Required for ESLint configuration.
export default config;
