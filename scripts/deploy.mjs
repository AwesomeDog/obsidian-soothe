import { access, copyFile, mkdir } from "node:fs/promises";
import path from "node:path";

const vault = process.argv[2];

if (!vault) {
	console.error("Usage: npm run deploy -- <vault-path>");
	process.exitCode = 1;
} else {
	const root = process.cwd();
	const target = path.join(vault, ".obsidian", "themes", "Soothe");
	const files = ["theme.css", "manifest.json"];

	try {
		await Promise.all(files.map((file) => access(path.join(root, file))));
		await mkdir(target, { recursive: true });
		await Promise.all(files.map((file) => copyFile(path.join(root, file), path.join(target, file))));
		console.log(`Installed Soothe in ${target}`);
	} catch (error) {
		console.error(`Unable to deploy Soothe to ${target}.`);
		console.error(error instanceof Error ? error.message : error);
		process.exitCode = 1;
	}
}
