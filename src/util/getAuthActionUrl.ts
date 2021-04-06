import { EmailType } from '../types/EmailType';

export const getAuthActionUrl = (type: EmailType, token: string) => {
  let actionParam: 'user-confirmation' | 'change-password';

  switch (type) {
    case 'CONFIRM_USER':
      actionParam = 'user-confirmation';
      break;
    case 'FORGOT_PASSWORD':
      actionParam = 'change-password';
      break;
  }

  return `http://localhost:3000/${actionParam}/${token}`;
};
