import chalk from 'chalk';
import { createConnection, getConnection } from 'typeorm';
import { redis } from './redis';

beforeAll(async () => {
  if (redis.status === 'end') {
    await redis.connect();
  }
  console.log(chalk.inverse.bold(' Global `beforeAll`: connected to redis '));
});

beforeEach(async () => {
  await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'typegraphql_test',
    entities: ['./**/*.entity.*'],
    synchronize: true,
    dropSchema: true,
  });

  console.log(
    chalk.inverse.bold(' Global `beforeEach`: connected to postgres ')
  );
});

afterEach(async () => {
  await getConnection().close();

  console.log(
    chalk.inverse.bold(' Global `afterEach`: postgres connection closed ') +
      chalk.bold.italic(' (dropSchema: true)')
  );
});

afterAll(async (done) => {
  redis.disconnect();

  console.log(
    chalk.inverse.bold(' Global `afterAll`: redis connection closed ')
  );

  done();
});
