import axios, { type AxiosInstance, AxiosError } from 'axios';
import type {
    CreatePostParams,
    UpdatePostParams,
    UploadMediaParams,
    WordPressApiResponse,
    WordPressCategory,
    WordPressConfig,
    WordPressError,
    WordPressMedia,
    WordPressPost,
    WordPressTag,
} from './wordpress.types';

/**
 * WordPress REST API Service
 * Handles all interactions with WordPress REST API v2
 * Preserves HTML content from TipTap editor
 */
export class WordPressService {
  private api: AxiosInstance;

  constructor(config: WordPressConfig) {
    console.log('🔧 Initializing WordPress Service:', {
      siteUrl: config.siteUrl,
      username: config.username,
      baseURL: `${config.siteUrl}/wp-json/wp/v2`,
    });
    
    // Create axios instance with base configuration
    this.api = axios.create({
      baseURL: `${config.siteUrl}/wp-json/wp/v2`,
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: config.username,
        password: config.applicationPassword,
      },
    });

    // Add request interceptor for debugging
    this.api.interceptors.request.use(
      (config) => {
        console.log('📤 WordPress API Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          baseURL: config.baseURL,
          fullURL: `${config.baseURL}${config.url}`,
        });
        return config;
      },
      (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => {
        console.log('✅ WordPress API Response:', {
          status: response.status,
          url: response.config.url,
          data: response.data,
        });
        return response;
      },
      (error: AxiosError) => {
        console.error('❌ WordPress API Error:', {
          status: error.response?.status,
          url: error.config?.url,
          message: error.message,
          data: error.response?.data,
        });
        return Promise.reject(this.handleError(error));
      }
    );
  }

  /**
   * Handle API errors and convert to WordPressError format
   */
  private handleError(error: AxiosError): WordPressError {
    if (error.response?.data) {
      const wpError = error.response.data as WordPressError;
      return wpError;
    }

    return {
      code: 'network_error',
      message: error.message || 'An unknown error occurred',
      data: {
        status: error.response?.status,
      },
    };
  }

  /**
   * Create a new WordPress post
   * Preserves all HTML content from the editor
   */
  async createPost(params: CreatePostParams): Promise<WordPressApiResponse<WordPressPost>> {
    try {
      console.log('📝 Creating WordPress post with params:', params);
      
      const postData: Partial<WordPressPost> = {
        title: {
          raw: params.title,
        },
        content: {
          raw: params.content, // HTML content from TipTap editor
        },
        excerpt: params.excerpt ? {
          raw: params.excerpt,
        } : undefined,
        status: params.status || 'draft',
        categories: params.categories,
        tags: params.tags,
        featured_media: params.featuredMediaId,
        slug: params.slug,
        date: params.date,
      };

      console.log('📦 Post data being sent:', postData);

      const response = await this.api.post<WordPressPost>('/posts', postData);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error as WordPressError,
      };
    }
  }

  /**
   * Update an existing WordPress post
   */
  async updatePost(params: UpdatePostParams): Promise<WordPressApiResponse<WordPressPost>> {
    try {
      const { id, ...updateData } = params;
      
      const postData: Partial<WordPressPost> = {
        ...(updateData.title && {
          title: { raw: updateData.title },
        }),
        ...(updateData.content && {
          content: { raw: updateData.content },
        }),
        ...(updateData.excerpt && {
          excerpt: { raw: updateData.excerpt },
        }),
        status: updateData.status,
        categories: updateData.categories,
        tags: updateData.tags,
        featured_media: updateData.featuredMediaId,
        slug: updateData.slug,
        date: updateData.date,
      };

      const response = await this.api.post<WordPressPost>(`/posts/${id}`, postData);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error as WordPressError,
      };
    }
  }

  /**
   * Get a post by ID
   */
  async getPost(id: number): Promise<WordPressApiResponse<WordPressPost>> {
    try {
      const response = await this.api.get<WordPressPost>(`/posts/${id}`);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error as WordPressError,
      };
    }
  }

  /**
   * Delete a post
   */
  async deletePost(id: number, force: boolean = false): Promise<WordPressApiResponse<WordPressPost>> {
    try {
      const response = await this.api.delete<WordPressPost>(`/posts/${id}`, {
        params: { force },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error as WordPressError,
      };
    }
  }

  /**
   * Upload media file to WordPress
   * Returns the media ID which can be used as featured_media
   */
  async uploadMedia(params: UploadMediaParams): Promise<WordPressApiResponse<WordPressMedia>> {
    try {
      const formData = new FormData();
      formData.append('file', params.file);
      
      if (params.title) formData.append('title', params.title);
      if (params.alt_text) formData.append('alt_text', params.alt_text);
      if (params.caption) formData.append('caption', params.caption);
      if (params.description) formData.append('description', params.description);

      const response = await this.api.post<WordPressMedia>('/media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error as WordPressError,
      };
    }
  }

  /**
   * Get all categories
   */
  async getCategories(): Promise<WordPressApiResponse<WordPressCategory[]>> {
    try {
      const response = await this.api.get<WordPressCategory[]>('/categories', {
        params: {
          per_page: 100, // Get up to 100 categories
        },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error as WordPressError,
      };
    }
  }

  /**
   * Create a new category
   */
  async createCategory(name: string, description?: string): Promise<WordPressApiResponse<WordPressCategory>> {
    try {
      const response = await this.api.post<WordPressCategory>('/categories', {
        name,
        description,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error as WordPressError,
      };
    }
  }

  /**
   * Get all tags
   */
  async getTags(): Promise<WordPressApiResponse<WordPressTag[]>> {
    try {
      const response = await this.api.get<WordPressTag[]>('/tags', {
        params: {
          per_page: 100, // Get up to 100 tags
        },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error as WordPressError,
      };
    }
  }

  /**
   * Create a new tag
   */
  async createTag(name: string, description?: string): Promise<WordPressApiResponse<WordPressTag>> {
    try {
      const response = await this.api.post<WordPressTag>('/tags', {
        name,
        description,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error as WordPressError,
      };
    }
  }

  /**
   * Find or create a category by name
   */
  async findOrCreateCategory(name: string): Promise<WordPressApiResponse<WordPressCategory>> {
    try {
      // First, try to find existing category
      const categoriesResponse = await this.getCategories();
      
      if (categoriesResponse.success && categoriesResponse.data) {
        const existing = categoriesResponse.data.find(
          (cat) => cat.name.toLowerCase() === name.toLowerCase()
        );
        
        if (existing) {
          return {
            success: true,
            data: existing,
          };
        }
      }

      // If not found, create new category
      return await this.createCategory(name);
    } catch (error) {
      return {
        success: false,
        error: error as WordPressError,
      };
    }
  }

  /**
   * Find or create a tag by name
   */
  async findOrCreateTag(name: string): Promise<WordPressApiResponse<WordPressTag>> {
    try {
      // First, try to find existing tag
      const tagsResponse = await this.getTags();
      
      if (tagsResponse.success && tagsResponse.data) {
        const existing = tagsResponse.data.find(
          (tag) => tag.name.toLowerCase() === name.toLowerCase()
        );
        
        if (existing) {
          return {
            success: true,
            data: existing,
          };
        }
      }

      // If not found, create new tag
      return await this.createTag(name);
    } catch (error) {
      return {
        success: false,
        error: error as WordPressError,
      };
    }
  }
}

/**
 * Create a WordPress service instance
 */
export const createWordPressService = (config: WordPressConfig): WordPressService => {
  return new WordPressService(config);
};
