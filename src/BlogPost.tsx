import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Share2, Tag, User } from 'lucide-react';
import type { WordPressPost } from './services/wordpress.types';

interface BlogPostProps {
  post: WordPressPost;
  onBack: () => void;
}

export function BlogPost({ post, onBack }: BlogPostProps) {
  // Extract data from embedded fields
  const featuredImage = (post as any)?._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const authorName = (post as any)?._embedded?.author?.[0]?.name || 'Unknown Author';
  const categories = (post as any)?._embedded?.['wp:term']?.[0] || [];
  const tags = (post as any)?._embedded?.['wp:term']?.[1] || [];

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Calculate reading time
  const calculateReadingTime = (content: string) => {
    const text = content.replace(/<[^>]*>/g, '');
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min de lecture`;
  };

  const handleShare = () => {
    if (navigator.share && post.link) {
      navigator.share({
        title: post.title?.rendered,
        url: post.link,
      });
    } else if (post.link) {
      navigator.clipboard.writeText(post.link);
      alert('Lien copié dans le presse-papiers!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-2 hover:gap-3 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux articles
        </Button>
      </div>

      {/* Hero Section */}
      {featuredImage && (
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          <img
            src={featuredImage}
            alt={post.title?.rendered || 'Post image'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="container mx-auto max-w-4xl">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg"
                dangerouslySetInnerHTML={{ __html: post.title?.rendered || 'Untitled' }}
              />
              
              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span className="font-medium">{authorName}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{formatDate(post.date)}</span>
                </div>
                
                {post.content?.rendered && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{calculateReadingTime(post.content.rendered)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Categories and Tags */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((category: any) => (
                <Badge
                  key={category.id}
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          )}
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag: any) => (
                <Badge
                  key={tag.id}
                  variant="outline"
                  className="gap-1"
                >
                  <Tag className="h-3 w-3" />
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Share Button */}
        <div className="flex justify-end mb-8">
          <Button
            variant="outline"
            onClick={handleShare}
            className="gap-2"
          >
            <Share2 className="h-4 w-4" />
            Partager
          </Button>
        </div>

        {/* Post Content */}
        <article
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
            prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:shadow-lg
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
            prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:shadow-xl"
          dangerouslySetInnerHTML={{ __html: post.content?.rendered || '' }}
        />
      </div>
    </div>
  );
}
