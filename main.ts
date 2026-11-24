// Real-Life Patch Notes: The Comedy Changelog — make.fun entry.
// Node 22, no dependencies, no network. Writes exactly one patch-note
// line to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt for local
// runs): UTF-8, one line, at most 160 characters, no trailing newline.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Revision round 2: added a release-note register guard — the line must
// open with a version tag (vX.Y.Z:) and end with a period, so a later edit
// cannot silently drift out of the changelog format the bounty grades.
const ENTRY =
  'v2.0.7: fixed a bug where the brain queued every embarrassing moment since 2009 and replayed them at 3 a.m. with no skip button.';

const chars = [...ENTRY].length;
if (chars < 1 || chars > 160) {
  throw new Error(`entry must be 1-160 characters, got ${chars}`);
}
if (ENTRY.includes('\n') || ENTRY.includes('\r')) {
  throw new Error('entry must be exactly one line');
}
if (!ENTRY.trim()) {
  throw new Error('entry must not be only white space');
}
if (!/^v\d+\.\d+\.\d+: /.test(ENTRY) || !ENTRY.endsWith('.')) {
  throw new Error('entry must open with a version tag (vX.Y.Z:) and end with a period');
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), ENTRY, 'utf8');
