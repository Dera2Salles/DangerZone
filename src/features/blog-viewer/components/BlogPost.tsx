import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { WordPressPost } from '@/services/wordpress/wordpress.types';
import { ArrowLeft, Calendar, Clock, Share2, Tag, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ImageCarousel } from './ImageCarousel';

interface BlogPostProps {
  post: WordPressPost;
  onBack: () => void;
}

export function BlogPost({ post, onBack }: BlogPostProps) {
  const [showCarousel, setShowCarousel] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [contentImages, setContentImages] = useState<string[]>([]);
  const [processedContent, setProcessedContent] = useState('');

  // Extract data from embedded fields
  const featuredImage = (post as any)?._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const authorName = (post as any)?._embedded?.author?.[0]?.name || 'Unknown Author';
  const categories = (post as any)?._embedded?.['wp:term']?.[0] || [];
  const tags = (post as any)?._embedded?.['wp:term']?.[1] || [];

  // Extract images from content
  useEffect(() => {
    if (!post.content?.rendered) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = post.content.rendered;
    
    const imgElements = tempDiv.querySelectorAll('img');
    const images: string[] = [];
    
    imgElements.forEach((img) => {
      const src = img.getAttribute('src');
      if (src) {
        images.push(src);
      }
    });

    setContentImages(images);

    // Remove images from content if there are multiple
    if (images.length > 1) {
      imgElements.forEach((img) => img.remove());
      setProcessedContent(tempDiv.innerHTML);
    } else {
      setProcessedContent(post.content.rendered);
    }
  }, [post.content?.rendered]);

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

  const openCarousel = (index: number) => {
    setCarouselIndex(index);
    setShowCarousel(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-mint/5 to-white dark:from-brand-primary-dark/20 dark:to-brand-primary-navy/20">
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
                  className="bg-brand-primary-light text-white dark:bg-brand-primary dark:text-brand-mint"
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

        {/* Image Gallery (if multiple images) */}
        {contentImages.length > 1 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-brand-primary-dark dark:text-brand-mint">
              Galerie ({contentImages.length} images)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {contentImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => openCarousel(idx)}
                  className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`Image ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-semibold text-lg">
                      {idx + 1}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Post Content */}
        <article
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-brand-primary-dark dark:prose-headings:text-brand-mint
            prose-p:text-brand-primary-navy/80 dark:prose-p:text-brand-secondary/90 prose-p:leading-relaxed
            prose-a:text-brand-primary dark:prose-a:text-brand-primary-light prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:shadow-lg prose-img:cursor-pointer
            prose-blockquote:border-l-4 prose-blockquote:border-brand-primary prose-blockquote:bg-brand-mint/10 dark:prose-blockquote:bg-brand-primary-dark/20 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
            prose-code:bg-brand-mint/10 dark:prose-code:bg-brand-primary-dark/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-brand-primary-navy dark:prose-pre:bg-black/40 prose-pre:shadow-xl"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
      </div>

      {/* Image Carousel */}
      {showCarousel && contentImages.length > 0 && (
        <ImageCarousel
          images={contentImages}
          initialIndex={carouselIndex}
          onClose={() => setShowCarousel(false)}
        />
      )}
    </div>
  );
}
