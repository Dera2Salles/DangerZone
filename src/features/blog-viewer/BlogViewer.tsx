import { useEffect, useState } from 'react';
import { getWordPressConfig } from '../../config/wordpress.config';
import type { WordPressCategory, WordPressPost } from '../../services/wordpress';
import { createWordPressService } from '../../services/wordpress';
import { BlogList } from './components/BlogList';
import { BlogPost } from './components/BlogPost';

export function BlogViewer() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [categories, setCategories] = useState<WordPressCategory[]>([]);
  const [selectedPost, setSelectedPost] = useState<WordPressPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Initialize WordPress service
  const wpConfig = getWordPressConfig();
  const wordpress = wpConfig ? createWordPressService(wpConfig) : null;

  // Load categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  // Load posts when filters change
  useEffect(() => {
    loadPosts(true);
  }, [searchQuery, selectedCategory]);

  const loadCategories = async () => {
    if (!wordpress) return;

    try {
      const response = await wordpress.getCategories();
      if (response.success && response.data) {
        setCategories(response.data);
      }
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const loadPosts = async (reset = false) => {
    if (!wordpress) {
      setError('WordPress n\'est pas configuré');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const page = reset ? 1 : currentPage;
      const response = await wordpress.getPosts({
        page,
        per_page: 9,
        search: searchQuery || undefined,
        categories: selectedCategory ? [selectedCategory] : undefined,
      });

      if (response.success && response.data) {
        if (reset) {
          setPosts(response.data);
          setCurrentPage(1);
        } else {
          setPosts((prev) => [...prev, ...response.data!]);
        }

        // Check if there are more posts
        setHasMore(response.data.length === 9);
      } else if (response.error) {
        setError(response.error.message);
      }
    } catch (err) {
      setError('Erreur lors du chargement des articles');
      console.error('Error loading posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
    loadPosts(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterCategory = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handlePostClick = (post: WordPressPost) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show single post view
  if (selectedPost) {
    return <BlogPost post={selectedPost} onBack={handleBack} />;
  }

  // Show post list
  return (
    <BlogList
      posts={posts}
      categories={categories}
      isLoading={isLoading}
      error={error}
      onPostClick={handlePostClick}
      onSearch={handleSearch}
      onFilterCategory={handleFilterCategory}
      onLoadMore={handleLoadMore}
      hasMore={hasMore}
    />
  );
}
