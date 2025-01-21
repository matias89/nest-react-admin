import apiService from './ApiService';

class ImagesService {
  async findLastImageById(id: string) {
    return (await apiService.get(`/api/images/last/${id}`, {})).data;
  }
}

export default new ImagesService();
