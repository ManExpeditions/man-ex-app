import Axios from "axios";

class verifyAPI {
  async verify(type, phone, userId, userToken, verificationCode) {
    const { data } = await Axios.post(
      `/api/user/v1/${userId}/verify/${type}`,
      {
        phone,
        verification_code: verificationCode,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return data;
  }

  async verificationCode(userId, userToken, type, phone) {
    const { data } = await Axios.post(
      `/api/user/v1/${userId}/verify/code?type=${type}`,
      { phone },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return data;
  }
}

export default new verifyAPI();
