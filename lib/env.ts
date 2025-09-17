import { validateEnv } from './validations';

// Validate environment variables on startup
let env: ReturnType<typeof validateEnv>;

try {
  env = validateEnv();
} catch (error) {
  console.error('❌ Environment validation failed:', error);
  process.exit(1);
}

export { env };
