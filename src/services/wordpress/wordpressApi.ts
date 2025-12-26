import axios from 'axios';

export class WordPressApi {
  private axiosInstance;
  private baseUrl: string;

  constructor(baseUrl: string, username: string, applicationPassword: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');

    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username,
        password: applicationPassword,
      },
    });
  }

  async uploadImage(file: File): Promise<{ id: number; url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', file.name);

    try {
      const response = await this.axiosInstance.post(
        '/wp-json/wp/v2/media',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      return {
        id: response.data.id,
        url: response.data.source_url,
      };
    } catch (error) {
      console.error('Upload image error:', error);
      throw error;
    }
  }

  async createPost(postData: {
    title: string;
    content: string;
    excerpt?: string;
    status?: string;
    categories?: number[];
    tags?: number[];
    featured_media?: number;
  }) {
    try {
      const response = await this.axiosInstance.post(
        '/wp-json/wp/v2/posts',
        postData,
      );
      return response.data;
    } catch (error) {
      console.error('Create post error:', error);
      throw error;
    }
  }

  async getCategories() {
    try {
      const response = await this.axiosInstance.get(
        '/wp-json/wp/v2/categories',
      );
      return response.data;
    } catch (error) {
      console.error('Get categories error:', error);
      return [];
    }
  }

  async getTags() {
    try {
      const response = await this.axiosInstance.get('/wp-json/wp/v2/tags');
      return response.data;
    } catch (error) {
      console.error('Get tags error:', error);
      return [];
    }
  }
}
