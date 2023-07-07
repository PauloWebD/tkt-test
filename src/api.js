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

  const fetchBusinessById = async (businessId) => {
    try {
      const response = await axios.get(`https://test.wertkt.com/api/result/${businessId}`);
      return response.data;
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données:', error);
      throw error;
    }
  };
  
  export { fetchBusinessData, fetchBusinessById };


