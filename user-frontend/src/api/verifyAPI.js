import Axios from "axios";

class verifyAPI {
  async verifyEmail(userId, verificationCode) {
    const { data } = await Axios.post(`api/user/v1/${userId}/verify/email`, {
      verification_code: verificationCode,
    });
    return data;
  }
}

export default new verifyAPI();
