import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, User } from 'lucide-react';
import type { WordPressPost } from './services/wordpress.types';

interface BlogCardProps {
  post: WordPressPost;
  onClick: () => void;
}

export function BlogCard({ post, onClick }: BlogCardProps) {
  // Extract featured image from embedded data
  const featuredImage = (post as any)?._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  
  // Extract author name from embedded data
  const authorName = (post as any)?._embedded?.author?.[0]?.name || 'Unknown Author';
  
  // Extract categories from embedded data
  const categories = (post as any)?._embedded?.['wp:term']?.[0] || [];
  
  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Calculate reading time (rough estimate: 200 words per minute)
  const calculateReadingTime = (content: string) => {
    const text = content.replace(/<[^>]*>/g, ''); // Strip HTML
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min`;
  };

  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
    >
      {/* Featured Image */}
      {featuredImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={featuredImage}
            alt={post.title?.rendered || 'Post image'}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Categories on image */}
          {categories.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {categories.slice(0, 2).map((category: any) => (
                <Badge
                  key={category.id}
                  className="bg-white/90 text-gray-900 backdrop-blur-sm hover:bg-white"
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}

      <CardContent className="p-6 space-y-4">
        {/* Title */}
        <h3
          className="text-2xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
          dangerouslySetInnerHTML={{ __html: post.title?.rendered || 'Untitled' }}
        />

        {/* Excerpt */}
        {post.excerpt?.rendered && (
          <div
            className="text-gray-600 dark:text-gray-300 line-clamp-3 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />
        )}

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span>{authorName}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.date)}</span>
          </div>
          
          {post.content?.rendered && (
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{calculateReadingTime(post.content.rendered)}</span>
            </div>
          )}
        </div>

        {/* Read More Button */}
        <div className="pt-2">
          <span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-2 transition-all">
            Lire la suite
            <span className="ml-1 group-hover:ml-2 transition-all">→</span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
