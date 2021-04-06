import faker from 'faker';
import { callGql } from '../../test-util/callGql';
import { User } from '../User.entity';

describe('Register resolver', () => {
  test('create user', async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const res = await callGql({
      variableValues: { data: user },
      source: `
        mutation Register($data: RegisterInput!) {
          register (
            data: $data
          ) {
            id
            firstName
            lastName
            email
            fullName
          }
        }
      `,
    });

    expect(res).toMatchObject({
      data: {
        register: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    });

    const databaseUser = await User.findOne({ email: user.email });
    expect(databaseUser).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(databaseUser!.confirmed).toBeFalsy();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(databaseUser!.email).toEqual(user.email);
  });
});
