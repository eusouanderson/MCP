#!/usr/bin/env node
/**
 * Builds a Node.js Single Executable Application (SEA).
 * Works with standard Node.js distributions on Linux.
 */
import { execSync } from 'node:child_process';
import { copyFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');
const SEA_CONFIG = join(DIST, 'sea-config.json');
const BLOB = join(DIST, 'sea-prep.blob');
const OUTPUT = join(DIST, 'mcp-frontend');
const BUNDLE = join(DIST, 'mcp-frontend.cjs');

try {
  // 1. Write sea-config.json
  writeFileSync(
    SEA_CONFIG,
    JSON.stringify({
      main: BUNDLE,
      output: BLOB,
      disableExperimentalSEAWarning: true,
    })
  );

  // 2. Try to generate the blob (this may fail on systems without SEA support)
  console.log('Generating SEA blob...');
  try {
    execSync(`node --experimental-sea-config ${SEA_CONFIG}`, { stdio: 'inherit' });
  } catch (err) {
    console.warn(
      '\n⚠️  SEA blob generation failed. This is expected on standard Node.js distributions.'
    );
    console.warn('Creating wrapper executable instead...\n');
    // Create a bash wrapper that executes the bundle
    const wrapper = `#!/bin/bash
exec node "${BUNDLE}" "$@"
`;
    writeFileSync(OUTPUT, wrapper);
    execSync(`chmod +x ${OUTPUT}`);
    console.log(`\n✅ Done! Executable created: ${OUTPUT}`);
    console.log('This is a wrapper executable that runs the bundle with Node.js.\n');
    process.exit(0);
  }

  // 3. Copy node binary to output path
  const nodeBin = process.execPath;
  console.log(`Copying node binary from ${nodeBin}...`);
  copyFileSync(nodeBin, OUTPUT);
  execSync(`chmod +x ${OUTPUT}`);

  // 4. Try to inject the blob (this may fail on systems without SEA fuse support)
  console.log('Injecting SEA blob with postject...');
  let injectionSuccess = false;
  try {
    execSync(
      `postject ${OUTPUT} NODE_SEA_BLOB ${BLOB} --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2`,
      { stdio: 'inherit' }
    );
    injectionSuccess = true;
  } catch (err) {
    console.warn(
      '\n⚠️  SEA injection failed. This is expected on Node.js builds without SEA support.'
    );
    console.warn('Falling back to wrapper executable...\n');
    // Replace the copied binary with a wrapper script
    const wrapper = `#!/bin/bash
exec node "${BUNDLE}" "$@"
`;
    writeFileSync(OUTPUT, wrapper);
    execSync(`chmod +x ${OUTPUT}`);
  }

  if (injectionSuccess) {
    console.log(`\n✅ Done! Single executable binary created: ${OUTPUT}`);
  } else {
    console.log(`\n✅ Done! Wrapper executable created: ${OUTPUT}`);
    console.log('This is a bash wrapper that runs the bundle with Node.js.\n');
  }
} catch (err) {
  console.error('Build error:', err.message);
  process.exit(1);
}
