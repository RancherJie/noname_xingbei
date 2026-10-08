#!/usr/bin/env node
/**
 * Synchronize and validate the complete built-in image inventory.
 *
 * Usage:
 *   node tools/sync-image-manifest.mjs --check  (read-only verification)
 *   node tools/sync-image-manifest.mjs --write  (after committing image changes)
 *
 * Requires Git and Node.js. Works on the image/ and theme/ trees; no network
 * access or external dependencies are needed.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifestFile = join(root, "game", "preload-manifest.json");
const extensions = new Set([".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".avif", ".bmp", ".ico"]);
const mode = process.argv[2] ?? "--check";

if (!["--check", "--write"].includes(mode) || process.argv.length > 3) {
  console.error("Usage: node tools/sync-image-manifest.mjs [--check|--write]");
  process.exit(2);
}

function git(args, binary = false) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: binary ? undefined : "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
}

function imagePathsOnDisk(directory) {
  const found = [];
  function walk(current) {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const fullPath = join(current, entry.name);
      if (entry.isDirectory()) walk(fullPath);
      else if (entry.isFile() && extensions.has(extname(entry.name).toLowerCase())) {
        found.push(relative(root, fullPath).split(sep).join("/"));
      }
    }
  }
  walk(join(root, directory));
  return found;
}

function buildManifest() {
  // Git tree hashes change when tracked images are added, updated or deleted.
  const version = ["image", "theme"].map(dir => git(["rev-parse", "HEAD:" + dir]).trim()).join("-");
  const raw = git(["ls-tree", "-r", "-l", "-z", "HEAD", "--", "image", "theme"], true);
  const assets = [];
  for (const record of raw.toString("utf8").split("\0")) {
    if (!record) continue;
    const match = /^100644 blob ([0-9a-f]{40}) (\d+)\t(.+)$/u.exec(record);
    if (!match) {
      // Reject executable image files rather than silently skipping them.
      const executable = /^100755 blob ([0-9a-f]{40}) (\d+)\t(.+)$/u.exec(record);
      if (executable && extensions.has(extname(executable[3]).toLowerCase())) {
        throw new Error("Image must be a regular file: " + executable[3]);
      }
      continue;
    }
    const [, gitBlobSha, sizeString, path] = match;
    if (!extensions.has(extname(path).toLowerCase())) continue;
    if (!(path.startsWith("image/") || path.startsWith("theme/"))) {
      throw new Error("Unexpected image path: " + path);
    }
    assets.push({ path, bytes: Number(sizeString), gitBlobSha });
  }
  assets.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);

  const trackedPaths = new Set(assets.map(a => a.path));
  if (trackedPaths.size !== assets.length) throw new Error("Duplicate image entries");
  const actualPaths = new Set([...imagePathsOnDisk("image"), ...imagePathsOnDisk("theme")]);
  for (const path of actualPaths) {
    if (!trackedPaths.has(path)) throw new Error("Image is not committed to Git: " + path);
  }
  for (const { path, bytes, gitBlobSha } of assets) {
    if (!actualPaths.has(path)) throw new Error("Image is missing from disk: " + path);
    const content = readFileSync(join(root, ...path.split("/")));
    if (content.length !== bytes) throw new Error("Image size changed since last commit: " + path);
    const currentSha = createHash("sha1").update("blob " + content.length + "\0").update(content).digest("hex");
    if (currentSha !== gitBlobSha) throw new Error("Image content changed since last commit: " + path);
  }

  return {
    schemaVersion: 1,
    version,
    count: assets.length,
    totalBytes: assets.reduce((sum, item) => sum + item.bytes, 0),
    assets,
  };
}

try {
  const manifest = buildManifest();
  const expected = JSON.stringify(manifest, null, 2) + "\n";
  if (mode === "--write") {
    if (!existsSync(manifestFile) || readFileSync(manifestFile, "utf8") !== expected) {
      writeFileSync(manifestFile, expected, "utf8");
      console.log("Updated game/preload-manifest.json");
    } else {
      console.log("Manifest already up to date");
    }
  } else if (!existsSync(manifestFile) || readFileSync(manifestFile, "utf8") !== expected) {
    throw new Error("Manifest is out of date. Commit image changes, then run: node tools/sync-image-manifest.mjs --write");
  }
  console.log("Verified " + manifest.count + " images (" + manifest.totalBytes + " bytes), version " + manifest.version);
} catch (error) {
  console.error("Image manifest validation failed: " + (error instanceof Error ? error.message : error));
  process.exitCode = 1;
}
