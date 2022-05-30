import sgMail from '@sendgrid/mail';
import config from '../env';

class SendGridServices {
  client: any;

  constructor(apiKey: string) {
    this.client = sgMail.setApiKey(apiKey);
  }

  async forgotPasswordService(to: string, token: string): Promise<any> {
    return this.client.send({
      to,
      from: 'hello@manexpeditions.com',
      template_id: 'd-c47f4798fb9b4997b9f53e747a3c0a54',
      dynamic_template_data: {
        passwordResetUrl: config.client_base_url + 'resetpassword/' + token
      }
    });
  }
}

export default new SendGridServices(config.twilio.sendgridApiKey);
