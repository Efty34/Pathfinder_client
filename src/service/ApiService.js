import axios from 'axios';

const baseURL = "https://pathfinder-server-gi5m.vercel.app/api/generate";

class ApiService {
  async postData(topic) {
    try {
      const response = await axios.post(baseURL, { topic }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data; 
    } catch (error) {
      console.error("Error in API call:", error);
      throw error; 
    }
  }
}

export default ApiService;