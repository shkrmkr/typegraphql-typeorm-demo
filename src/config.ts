import dotenv from 'dotenv';

dotenv.config();

if (!process.env.SENDGRID_API_KEY) {
  console.error('Environment variable `SENDGRID_API_KEY` must be set.');
  process.exit(1);
}

export const config: Record<string, string> = {
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  PORT: process.env.PORT || '9298',
};
