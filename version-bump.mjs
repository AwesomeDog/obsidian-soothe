/**
 * This script makes it slightly easier to release new versions of your
 * theme. If you are not using Github Releases with your theme, or
 * you are not interested in automating the process, you can safely ignore
 * this script.
 *
 * Usage: `$ npm version patch` (npm runs this script automatically)
 *
 * This script will automatically bump the version in manifest.json and add a
 * new entry to versions.json for the current version of your theme.
 */

import { readFileSync, writeFileSync } from "node:fs";

const targetVersion =
	process.env.npm_package_version ?? JSON.parse(readFileSync("package.json", "utf8")).version;

if (!targetVersion) {
	throw new Error("Unable to determine the target version.");
}

// read minAppVersion from manifest.json and bump version to target version
const manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const { minAppVersion } = manifest;
manifest.version = targetVersion;
writeFileSync("manifest.json", `${JSON.stringify(manifest, null, "\t")}\n`);

// update versions.json with target version and minAppVersion from manifest.json
const versions = JSON.parse(readFileSync("versions.json", "utf8"));
versions[targetVersion] = minAppVersion;
writeFileSync("versions.json", `${JSON.stringify(versions, null, "\t")}\n`);

console.log(`Bumped theme to ${targetVersion} (minAppVersion ${minAppVersion}).`);
