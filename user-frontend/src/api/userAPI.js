import Axios from 'axios';

class userAPI {
  async verify(type, payload, userId, userToken, verificationCode) {
    const { data } = await Axios.post(
      `/api/user/v1/${userId}/verify/${type}`,
      {
        ...(type === 'email' ? { email: payload } : { phone: payload }),
        verification_code: verificationCode
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    );
    return data;
  }

  async verificationCode(userId, userToken, type, payload) {
    const { data } = await Axios.post(
      `/api/user/v1/${userId}/verify/code?type=${type}`,
      {
        ...(type === 'email' ? { email: payload } : { phone: payload })
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    );
    return data;
  }

  async validateUser(userId, userToken, password) {
    const { data } = await Axios.post(
      `/api/user/v1/${userId}/validate`,
      { password },
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    );
    return data;
  }

  async deleteUser(userId, userToken) {
    const { data } = await Axios.delete(`/api/user/v1/${userId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });
    return data;
  }

  async updateUser(userId, userToken, userData) {
    const { data } = await Axios.put(`/api/user/v1/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });
    return data;
  }

  async getUserProfile(userId, userToken) {
    const { data } = await Axios.get(`/api/user/v1/${userId}/profile`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });
    return data;
  }

  async getUserOrders(userId, userToken) {
    const { data } = await Axios.get(`/api/user/v1/${userId}/orders`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });
    return data;
  }

  async userAddToFavorites(userId, userToken, type, id) {
    const { data } = await Axios.patch(
      `/api/user/v1/${userId}/favorites/add?type=${type}`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    );
    return data;
  }

  async userRemoveFromFavorites(userId, userToken, type, id) {
    const { data } = await Axios.patch(
      `/api/user/v1/${userId}/favorites/remove?type=${type}`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    );
    return data;
  }
}

export default new userAPI();
