import { build } from 'esbuild';

build({
  entryPoints: ['./src/infra/server.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  platform: 'node',
  target: 'esnext',
  outfile: 'dist/index.js',
});
