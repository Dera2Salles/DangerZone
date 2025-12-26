import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, Filter, Loader2, Search } from 'lucide-react';
import { useState } from 'react';
import { BlogCard } from './BlogCard';
import type { WordPressCategory, WordPressPost } from './services/wordpress.types';

interface BlogListProps {
  posts: WordPressPost[];
  categories: WordPressCategory[];
  isLoading: boolean;
  error: string | null;
  onPostClick: (post: WordPressPost) => void;
  onSearch: (query: string) => void;
  onFilterCategory: (categoryId: number | null) => void;
  onLoadMore: () => void;
  hasMore: boolean;
}

export function BlogList({
  posts,
  categories,
  isLoading,
  error,
  onPostClick,
  onSearch,
  onFilterCategory,
  onLoadMore,
  hasMore,
}: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleCategoryClick = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    onFilterCategory(categoryId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez nos derniers articles et actualités
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-14 text-lg border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-full shadow-lg"
            />
            <Button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
            >
              Rechercher
            </Button>
          </form>
        </div>

        {/* Category Filters */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Badge
              variant={selectedCategory === null ? 'default' : 'outline'}
              className="cursor-pointer px-4 py-2 text-sm hover:scale-105 transition-transform"
              onClick={() => handleCategoryClick(null)}
            >
              <Filter className="h-4 w-4 mr-1" />
              Tous
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className="cursor-pointer px-4 py-2 text-sm hover:scale-105 transition-transform"
                onClick={() => handleCategoryClick(category.id!)}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Loading State */}
        {isLoading && posts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Chargement des articles...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center py-20">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <p className="text-red-600 dark:text-red-400 text-lg mb-2">
              Erreur lors du chargement
            </p>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </div>
        )}

        {/* Posts Grid */}
        {!error && posts.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onClick={() => onPostClick(post)}
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center">
                <Button
                  onClick={onLoadMore}
                  disabled={isLoading}
                  size="lg"
                  className="gap-2 px-8"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Chargement...
                    </>
                  ) : (
                    'Charger plus d\'articles'
                  )}
                </Button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!isLoading && !error && posts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-600 dark:text-gray-300 text-xl mb-2">
              Aucun article trouvé
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Essayez une autre recherche ou catégorie
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
