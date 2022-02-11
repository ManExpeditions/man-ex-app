import Axios from "axios";

class userAPI {
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
      { ...(phone ? { phone } : {}) },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return data;
  }

  async updateUser(userId, userToken, userData) {
    const { data } = await Axios.put(`/api/user/v1/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return data;
  }
}

export default new userAPI();
