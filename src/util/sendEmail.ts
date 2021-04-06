import sendgrid from '@sendgrid/mail';
import { config } from '../config';

sendgrid.setApiKey(config.SENDGRID_API_KEY);

export const sendEmail = async (to: string, url: string) => {
  try {
    await sendgrid.send({
      to,
      from: 'shkrmkr36@gmail.com', // Use the email address or domain you verified above
      subject: 'Sending with Twilio SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: `<a href="${url}">${url}</a>`,
    });
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};
