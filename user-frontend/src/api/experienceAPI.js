import Axios from "axios";

class experienceAPI {
  async getExperiences() {
    const { data } = await Axios.get("/api/experience/v1/");
    return data;
  }
}

export default new experienceAPI();
