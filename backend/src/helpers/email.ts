import client from 'twilio';
import config from '../env';

const Email = {
  verifyEmail(email: string) {
    const cln = client(config.twilio.accoundSid, config.twilio.authToken);
    return cln.verify
      .services(config.twilio.verifySid)
      .verifications.create({ to: email, channel: 'email' });
  }
};

export default Email;