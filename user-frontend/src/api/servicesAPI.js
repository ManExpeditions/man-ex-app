import Axios from "axios";

class servicesAPI {
  async locationAutoComplete(userToken, location) {
    const { data } = await Axios.post(
      "/api/services/v1/location",
      {
        location,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return data;
  }
}

export default new servicesAPI();
