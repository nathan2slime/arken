import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts', 'src/'],
  splitting: true,
  dts: true,
  outDir: 'dist',
  format: ['cjs'],
  skipNodeModulesBundle: true,
  sourcemap: false,
  tsconfig: 'tsconfig.json',
  clean: true,
});
