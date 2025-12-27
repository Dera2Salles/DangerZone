import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { WordPressCategory, WordPressPost } from '@/services/wordpress';
import { AlertCircle, Filter, Loader2, Search } from 'lucide-react';
import { useState } from 'react';
import { BlogCard } from './BlogCard';

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
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-primary font-semibold tracking-wide uppercase text-sm">Journal & Actualités</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-3 mb-6 text-brand-primary-navy dark:text-white">
            Le Blog <span className="text-brand-gold italic">Luxe Estates</span>
          </h1>
          <div className="w-20 h-1 bg-brand-gold mx-auto rounded-full mb-8"/>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-light">
            Au cœur de l'immobilier de prestige : tendances, conseils et découvertes.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-brand-gold transition-colors" />
            <Input
              type="text"
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 pr-32 h-16 text-lg border-2 border-gray-100 dark:border-gray-800 focus:border-brand-gold dark:focus:border-brand-gold rounded-full shadow-lg bg-white dark:bg-card transition-all"
            />
            <Button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-6 bg-brand-primary-navy hover:bg-brand-primary text-white"
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
            <Loader2 className="h-12 w-12 animate-spin text-brand-primary mb-4" />
            <p className="text-brand-primary-dark dark:text-brand-mint text-lg">
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
