import axios from 'axios';

const fetchBusinessData = async () => {
    try {
      const response = await axios.get('https://test.wertkt.com/api/biz/');
      return response.data;
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données:', error);
      throw error;
    }
  };

  const fetchBusinessById = async (results) => {
    try {
      const response1 = await axios.get(`https://test.wertkt.com/api/result/${results[0]}`);
      const response2 = await axios.get(`https://test.wertkt.com/api/result/${results[1]}`);
      const datas = [response1.data, response2.data];
      return datas;
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données:', error);
      throw error;
    }
  };
  
  export { fetchBusinessData, fetchBusinessById };


