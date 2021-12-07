import Axios from "axios";

class authAPI {
  async registerByEmail(email, password) {
    const { data } = await Axios.post("/api/auth/v1/register/email", {
      email,
      password,
    });
    return data;
  }
}

export default new authAPI();
