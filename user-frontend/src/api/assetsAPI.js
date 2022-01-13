import Axios from "axios";

class assetsAPI {
  async singlePhotoUpload(userToken, type, photoFormData) {
    const { data } = await Axios.post(
      `/api/assets/v1/upload/photo?type=${type}`,
      photoFormData,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return data;
  }
}

export default new assetsAPI();
