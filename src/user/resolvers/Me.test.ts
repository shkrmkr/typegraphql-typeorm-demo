import faker from 'faker';
import { callGql } from '../../test-util/callGql';
import { User } from '../User.entity';

const meQuery = `
  {
    me {
      id
      firstName
      lastName
      email
      fullName
    }
  }
`;

describe('Me resolver', () => {
  test('return user if user info is in the session', async () => {
    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }).save();

    const res = await callGql({
      source: meQuery,
      userId: user.id,
    });

    expect(res).toMatchObject({
      data: {
        me: {
          id: user.id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          fullName: user.fullName(),
        },
      },
    });
  });

  test('return null if user info is not in the session', async () => {
    const res = await callGql({ source: meQuery });

    expect(res).toMatchObject({
      data: {
        me: null,
      },
    });
  });
});
