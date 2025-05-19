import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://accounts:npg_CSABFIxLGO02@ep-royal-bush-a4le85rs-pooler.us-east-1.aws.neon.tech/mocker-interview?sslmode=require'
  }
});
