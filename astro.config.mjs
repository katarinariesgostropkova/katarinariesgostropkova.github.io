import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { createHash } from 'node:crypto';
import { loadEnv } from 'vite';

// loadEnv reads .env files the same way Vite does during the build.
// Using '' as prefix loads ALL variables, not just VITE_-prefixed ones.
// process.env.CASE_STUDY_PASSWORD is also checked to support CI environments
// where the variable is injected directly rather than via .env.
const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const password = process.env.CASE_STUDY_PASSWORD ?? env.CASE_STUDY_PASSWORD ?? '';
const passwordHash = createHash('sha256').update(password).digest('hex');

export default defineConfig({
  output: 'static',
  site: 'https://katarinariesgostropkova.github.io',
  integrations: [mdx()],
  vite: {
    define: {
      // Injects the hash as a build-time constant.
      // import.meta.env.PUBLIC_PASSWORD_HASH resolves to the literal hash
      // string in the client bundle — the plain password is never shipped.
      'import.meta.env.PUBLIC_PASSWORD_HASH': JSON.stringify(passwordHash),
    },
  },
});
