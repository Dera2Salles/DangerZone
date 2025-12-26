import { useCallback, useEffect, useMemo, useState } from 'react';
import { WordPressService, createWordPressService } from '@/services/wordpress';
import type {
    CreatePostParams,
    UpdatePostParams,
    UploadMediaParams,
    WordPressCategory,
    WordPressConfig,
    WordPressPost,
    WordPressTag,
} from '@/services/wordpress';

interface UseWordPressOptions {
  config: WordPressConfig;
  autoLoadCategories?: boolean;
  autoLoadTags?: boolean;
}

interface UseWordPressReturn {
  // Service instance
  service: WordPressService;
  
  // Post operations
  createPost: (params: CreatePostParams) => Promise<WordPressPost | null>;
  updatePost: (params: UpdatePostParams) => Promise<WordPressPost | null>;
  deletePost: (id: number, force?: boolean) => Promise<boolean>;
  
  // Media operations
  uploadMedia: (params: UploadMediaParams) => Promise<number | null>;
  
  // Category operations
  categories: WordPressCategory[];
  loadCategories: () => Promise<void>;
  findOrCreateCategory: (name: string) => Promise<number | null>;
  
  // Tag operations
  tags: WordPressTag[];
  loadTags: () => Promise<void>;
  findOrCreateTag: (name: string) => Promise<number | null>;
  
  // State
  isLoading: boolean;
  error: string | null;
  uploadProgress: number;
}

/**
 * Custom React hook for WordPress REST API operations
 * Provides easy-to-use methods for publishing blog posts
 */
export const useWordPress = (options: UseWordPressOptions): UseWordPressReturn => {
  const { config, autoLoadCategories = true, autoLoadTags = true } = options;

  // Create service instance (memoized)
  const service = useMemo(() => createWordPressService(config), [
    config.siteUrl,
    config.username,
    config.applicationPassword,
  ]);

  // State
  const [categories, setCategories] = useState<WordPressCategory[]>([]);
  const [tags, setTags] = useState<WordPressTag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  /**
   * Load categories from WordPress
   */
  const loadCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await service.getCategories();
      
      if (response.success && response.data) {
        setCategories(response.data);
      } else if (response.error) {
        setError(response.error.message);
      }
    } catch (err) {
      setError('Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  /**
   * Load tags from WordPress
   */
  const loadTags = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await service.getTags();
      
      if (response.success && response.data) {
        setTags(response.data);
      } else if (response.error) {
        setError(response.error.message);
      }
    } catch (err) {
      setError('Failed to load tags');
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  /**
   * Auto-load categories and tags on mount
   */
  useEffect(() => {
    if (autoLoadCategories) {
      loadCategories();
    }
  }, [autoLoadCategories, loadCategories]);

  useEffect(() => {
    if (autoLoadTags) {
      loadTags();
    }
  }, [autoLoadTags, loadTags]);

  /**
   * Create a new post
   */
  const createPost = useCallback(async (params: CreatePostParams): Promise<WordPressPost | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await service.createPost(params);
      
      if (response.success && response.data) {
        return response.data;
      } else if (response.error) {
        setError(response.error.message);
        return null;
      }
      
      return null;
    } catch (err) {
      setError('Failed to create post');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  /**
   * Update an existing post
   */
  const updatePost = useCallback(async (params: UpdatePostParams): Promise<WordPressPost | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await service.updatePost(params);
      
      if (response.success && response.data) {
        return response.data;
      } else if (response.error) {
        setError(response.error.message);
        return null;
      }
      
      return null;
    } catch (err) {
      setError('Failed to update post');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  /**
   * Delete a post
   */
  const deletePost = useCallback(async (id: number, force: boolean = false): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await service.deletePost(id, force);
      
      if (response.success) {
        return true;
      } else if (response.error) {
        setError(response.error.message);
        return false;
      }
      
      return false;
    } catch (err) {
      setError('Failed to delete post');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  /**
   * Upload media file
   * Returns the media ID on success
   */
  const uploadMedia = useCallback(async (params: UploadMediaParams): Promise<number | null> => {
    setIsLoading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Simulate progress (WordPress API doesn't provide upload progress)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const response = await service.uploadMedia(params);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.success && response.data) {
        return response.data.id || null;
      } else if (response.error) {
        setError(response.error.message);
        return null;
      }
      
      return null;
    } catch (err) {
      setError('Failed to upload media');
      return null;
    } finally {
      setIsLoading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  }, [service]);

  /**
   * Find or create a category by name
   * Returns the category ID
   */
  const findOrCreateCategory = useCallback(async (name: string): Promise<number | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await service.findOrCreateCategory(name);
      
      if (response.success && response.data) {
        // Update categories list if new category was created
        if (!categories.find((cat) => cat.id === response.data?.id)) {
          setCategories((prev) => [...prev, response.data!]);
        }
        
        return response.data.id || null;
      } else if (response.error) {
        setError(response.error.message);
        return null;
      }
      
      return null;
    } catch (err) {
      setError('Failed to find or create category');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [service, categories]);

  /**
   * Find or create a tag by name
   * Returns the tag ID
   */
  const findOrCreateTag = useCallback(async (name: string): Promise<number | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await service.findOrCreateTag(name);
      
      if (response.success && response.data) {
        // Update tags list if new tag was created
        if (!tags.find((tag) => tag.id === response.data?.id)) {
          setTags((prev) => [...prev, response.data!]);
        }
        
        return response.data.id || null;
      } else if (response.error) {
        setError(response.error.message);
        return null;
      }
      
      return null;
    } catch (err) {
      setError('Failed to find or create tag');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [service, tags]);

  return {
    service,
    createPost,
    updatePost,
    deletePost,
    uploadMedia,
    categories,
    loadCategories,
    findOrCreateCategory,
    tags,
    loadTags,
    findOrCreateTag,
    isLoading,
    error,
    uploadProgress,
  };
};
