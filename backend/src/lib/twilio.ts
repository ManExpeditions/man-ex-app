import { Twilio } from 'twilio';
import { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck';
import config from '../env';

class TwilioServices {
  client: Twilio;

  constructor(accoundSid: string, authToken: string) {
    this.client = new Twilio(accoundSid, authToken);
  }

  sendVerificationEmail(email: string) {
    return this.client.verify
      .services(config.twilio.verifySid)
      .verifications.create({ to: email, channel: 'email' });
  }

  verifyEmail(to: string, code: string): Promise<VerificationCheckInstance> {
    return this.client.verify
      .services(config.twilio.verifySid)
      .verificationChecks.create({
        to,
        code
      });
  }
}

export default new TwilioServices(
  config.twilio.accoundSid,
  config.twilio.authToken
);
