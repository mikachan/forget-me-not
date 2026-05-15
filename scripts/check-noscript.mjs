import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	'..'
);
const srcDir = path.join(repoRoot, 'src');
const sourceFilePattern = /\.(svelte|ts|js)$/;

async function listSourceFiles(dir) {
	const entries = await readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(async (entry) => {
			const entryPath = path.join(dir, entry.name);

			if (entry.isDirectory()) {
				return listSourceFiles(entryPath);
			}

			if (entry.isFile() && sourceFilePattern.test(entry.name)) {
				return [entryPath];
			}

			return [];
		})
	);

	return files.flat();
}

function toRelative(filePath) {
	return path.relative(repoRoot, filePath);
}

function escapeRegExp(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const failures = [];
const sourceFiles = await listSourceFiles(srcDir);
const files = await Promise.all(
	sourceFiles.map(async (filePath) => ({
		path: filePath,
		relativePath: toRelative(filePath),
		source: await readFile(filePath, 'utf8'),
	}))
);

const readProjectFile = async (relativePath) =>
	readFile(path.join(repoRoot, relativePath), 'utf8');

const navSource = await readProjectFile('src/lib/Nav.svelte');
if (!navSource.includes('<details') || !navSource.includes('<summary')) {
	failures.push(
		'src/lib/Nav.svelte should keep the mobile menu on native details/summary controls.'
	);
}

const imageSource = await readProjectFile('src/lib/Image.svelte');
if (!imageSource.includes('<img')) {
	failures.push('src/lib/Image.svelte should render a real img element.');
}

for (const { relativePath, source } of files) {
	if (/href\s*=\s*(?:"|'|{`?)\s*javascript:/i.test(source)) {
		failures.push(`${relativePath} should not use javascript: links.`);
	}

	const youtubeEmbeds = source.matchAll(
		/https:\/\/www\.youtube\.com\/embed\/([A-Za-z0-9_-]+)/g
	);

	for (const [, videoId] of youtubeEmbeds) {
		const directLinkPattern = new RegExp(
			`https://(?:www\\.)?youtube\\.com/watch\\?v=${escapeRegExp(videoId)}|https://youtu\\.be/${escapeRegExp(videoId)}`
		);

		if (!directLinkPattern.test(source)) {
			failures.push(
				`${relativePath} embeds YouTube video ${videoId} without a direct watch link.`
			);
		}
	}
}

if (failures.length > 0) {
	console.error('No-JS check failed:');
	for (const failure of failures) {
		console.error(`- ${failure}`);
	}
	process.exit(1);
}

console.log(`No-JS check passed (${sourceFiles.length} source files scanned).`);
