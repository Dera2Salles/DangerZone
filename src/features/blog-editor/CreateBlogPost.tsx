import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getWordPressConfig, isWordPressConfigured } from '@/config/wordpress.config';
import { useWordPress } from '@/hooks/useWordPress';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Eye,
  Loader2,
  Save,
  Tag,
  Upload
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BlogEditor } from './components/BlogEditor';

export function CreateBlogPost() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [status, setStatus] = useState<'draft' | 'publish' | 'pending' | 'private'>('draft');
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showNewCategoryDialog, setShowNewCategoryDialog] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // WordPress integration
  const wpConfig = getWordPressConfig();
  const wordpress = wpConfig ? useWordPress({ config: wpConfig }) : null;

  // Load categories from WordPress
  useEffect(() => {
    if (wordpress && wordpress.categories.length === 0) {
      wordpress.loadCategories();
    }
  }, [wordpress]);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!isWordPressConfigured()) {
      toast.error('WordPress is not configured. Please set up your .env.local file.');
      console.log('Article saved locally:', {
        title,
        excerpt,
        content,
        category,
        tags,
        status,
        featuredImage,
        createdAt: new Date().toISOString(),
      });
      return;
    }

    if (!wordpress) {
      toast.error('WordPress service is not available');
      return;
    }

    if (!title.trim()) {
      toast.error('Please enter a title for your post');
      return;
    }

    if (!content.trim()) {
      toast.error('Please add some content to your post');
      return;
    }

    setIsPublishing(true);
    const publishToast = toast.loading('Publishing to WordPress...');

    try {
      // Upload featured image if exists
      let featuredMediaId: number | undefined;
      if (featuredImageFile) {
        toast.loading('Uploading featured image...', { id: publishToast });
        featuredMediaId = await wordpress.uploadMedia({
          file: featuredImageFile,
          title: title,
          alt_text: title,
        }) || undefined;
      }

      // Get or create category
      let categoryId: number | undefined;
      if (category) {
        toast.loading('Processing category...', { id: publishToast });
        categoryId = await wordpress.findOrCreateCategory(category) || undefined;
      }

      // Get or create tags
      toast.loading('Processing tags...', { id: publishToast });
      const tagIds: number[] = [];
      for (const tagName of tags) {
        const tagId = await wordpress.findOrCreateTag(tagName);
        if (tagId) tagIds.push(tagId);
      }

      // Create the post
      toast.loading('Creating post...', { id: publishToast });
      const post = await wordpress.createPost({
        title,
        content, // HTML content from TipTap editor
        excerpt,
        status,
        categories: categoryId ? [categoryId] : undefined,
        tags: tagIds.length > 0 ? tagIds : undefined,
        featuredMediaId,
      });

      if (post) {
        toast.success(
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            <div>
              <p className="font-semibold">Post published successfully!</p>
              {post.link && (
                <a 
                  href={post.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-brand-primary hover:underline"
                >
                  View post →
                </a>
              )}
            </div>
          </div>,
          { id: publishToast, duration: 5000 }
        );

        // Clear form
        setTitle('');
        setExcerpt('');
        setContent('');
        setCategory('');
        setTags([]);
        setFeaturedImage(null);
        setFeaturedImageFile(null);
        setStatus('draft');
      } else {
        throw new Error('Failed to create post');
      }
    } catch (error) {
      console.error('Error publishing to WordPress:', error);
      toast.error(
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <div>
            <p className="font-semibold">Failed to publish post</p>
            <p className="text-sm">{wordpress.error || 'Unknown error occurred'}</p>
          </div>
        </div>,
        { id: publishToast, duration: 5000 }
      );
    } finally {
      setIsPublishing(false);
    }
  };

  const handleCreateCategory = async () => {
    if (!wordpress || !newCategoryName.trim()) return;

    const loadingToast = toast.loading('Création de la catégorie...');

    try {
      const categoryId = await wordpress.findOrCreateCategory(newCategoryName.trim());
      
      if (categoryId) {
        toast.success('Catégorie créée avec succès!', { id: loadingToast });
        
        // Reload categories to update the list
        await wordpress.loadCategories();
        
        // Select the newly created category
        setCategory(newCategoryName.trim());
        
        // Close dialog and reset
        setShowNewCategoryDialog(false);
        setNewCategoryName('');
      } else {
        throw new Error('Failed to create category');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error('Erreur lors de la création de la catégorie', { id: loadingToast });
    }
  };

  const handlePreview = () => {
    // Create a preview window with the content
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${title || 'Preview'}</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 2rem;
                line-height: 1.6;
                color: #112a41;
                background-color: #ffffff;
              }
              h1 { margin-bottom: 0.5rem; color: #288279; border-bottom: 2px solid #C4ECEA; padding-bottom: 0.5rem; }
              .excerpt { color: #799F9C; font-style: italic; margin-bottom: 2rem; border-left: 4px solid #34b5ab; padding-left: 1rem; }
              .content { margin-top: 2rem; }
              
              /* List Styles */
              ul { list-style-type: disc !important; padding-left: 1.5em !important; margin: 1em 0 !important; }
              ol { list-style-type: decimal !important; padding-left: 1.5em !important; margin: 1em 0 !important; }
              
              /* Content Styles */
              img { max-width: 100%; height: auto; border-radius: 8px; margin: 1rem 0; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
              a { color: #288279; text-decoration: underline; }
              blockquote { border-left: 4px solid #288279; background: #C4ECEA/20; padding: 1rem; margin: 1.5rem 0; font-style: italic; border-radius: 0 8px 8px 0; }
              code { background: #f3f4f6; padding: 0.2rem 0.4rem; border-radius: 4px; font-family: monospace; }
              pre { background: #111827; color: white; padding: 1rem; border-radius: 8px; overflow-x: auto; }
              
              /* Alignment */
              [style*="text-align: right"] { text-align: right; }
              [style*="text-align: center"] { text-align: center; }
              [style*="text-align: justify"] { text-align: justify; }
            </style>
          </head>
          <body>
            <h1>${title || 'Untitled'}</h1>
            ${excerpt ? `<p class="excerpt">${excerpt}</p>` : ''}
            ${featuredImage ? `<img src="${featuredImage}" alt="Featured image" />` : ''}
            <div class="content prose content-area">${content}</div>
          </body>
        </html>
      `);
      previewWindow.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background py-12">
      <div className="container mx-auto px-4 max-w-7xl space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/20 border-none">Admin</Badge>
              <span className="text-sm text-gray-500">Éditeur de Blog</span>
            </div>
            <h1 className="text-3xl font-bold text-brand-primary-navy dark:text-white">Créer un nouvel article</h1>
            {!isWordPressConfigured() && (
              <p className="text-sm text-brand-gold mt-1 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                Mode hors ligne (Sauvegarde locale uniquement)
              </p>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handlePreview} 
              disabled={isPublishing}
              className="border-gray-200 hover:bg-gray-50 text-gray-700"
            >
              <Eye className="h-4 w-4 mr-2" />
              Prévisualiser
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isPublishing}
              className="bg-brand-primary-navy hover:bg-brand-primary text-white min-w-[140px]"
            >
              {isPublishing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Publication...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Publier
                </>
              )}
            </Button>
          </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-6">
          {/* Titre */}
          {/* Titre */}
          <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-sm border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-brand-gold/50 focus-within:border-brand-gold focus-within:ring-4 focus-within:ring-brand-gold/10 transition-all duration-300">
            <Label htmlFor="post-title" className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-2 block">
              Titre de l'article
            </Label>
            <Input
              id="post-title"
              placeholder="Saisissez le titre de l'article"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl md:text-4xl font-extrabold border-none focus-visible:ring-0 bg-transparent px-0 placeholder:text-gray-300 dark:placeholder:text-gray-600 h-auto w-full text-brand-primary-navy dark:text-white"
            />
          </div>

          {/* Éditeur */}
          <div className="space-y-2">
             <Label className="text-sm font-medium text-gray-500 uppercase tracking-wide ml-1">Contenu de l'article</Label>
             <BlogEditor
                content={content}
                onChange={setContent}
                placeholder="Rédigez votre histoire..."
              />
          </div>

          {/* Extrait */}
          <Card>
            <CardHeader>
              <CardTitle>Extrait</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Courte description de l'article (affiché dans les listes)"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
              />
            </CardContent>
          </Card>
        </div>

        {/* Barre latérale */}
        <div className="space-y-6">
          {/* Statut */}
          <Card>
            <CardHeader>
              <CardTitle>Statut</CardTitle>
            </CardHeader>
            <CardContent>
              <Select 
                value={status} 
                onValueChange={(value) => setStatus(value as 'draft' | 'publish' | 'pending' | 'private')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="publish">Publié</SelectItem>
                  <SelectItem value="future">Planifié</SelectItem>
                  <SelectItem value="private">Privé</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Catégorie */}
          <Card>
            <CardHeader>
              <CardTitle>Catégorie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {wordpress && wordpress.categories.length > 0 ? (
                      wordpress.categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))
                    ) : (
                      <>
                        <SelectItem value="Technologie">Technologie</SelectItem>
                        <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                        <SelectItem value="Voyage">Voyage</SelectItem>
                        <SelectItem value="Cuisine">Cuisine</SelectItem>
                        <SelectItem value="Sport">Sport</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                
                {/* Add New Category Button */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNewCategoryDialog(true)}
                  className="w-full gap-2"
                >
                  <span className="text-lg">+</span>
                  Créer une nouvelle catégorie
                </Button>
                
                {wordpress && wordpress.categories.length > 0 && (
                  <p className="text-xs text-brand-primary/60">
                    {wordpress.categories.length} catégories disponibles
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* New Category Dialog */}
          {showNewCategoryDialog && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Nouvelle Catégorie</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="new-category">Nom de la catégorie</Label>
                    <Input
                      id="new-category"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Ex: Technologie"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleCreateCategory();
                        }
                      }}
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowNewCategoryDialog(false);
                        setNewCategoryName('');
                      }}
                    >
                      Annuler
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCreateCategory}
                      disabled={!newCategoryName.trim()}
                    >
                      Créer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ajouter un tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <Button type="button" onClick={handleAddTag}>
                    <Tag className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Image à la une */}
          <Card>
            <CardHeader>
              <CardTitle>Image à la une</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {featuredImage ? (
                  <div className="relative">
                    <img
                      src={featuredImage}
                      alt="Featured"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setFeaturedImage(null)}
                    >
                      Supprimer
                    </Button>
                  </div>
                ) : (
                  <Label
                    htmlFor="image-upload"
                    className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                  >
                    <Upload className="h-8 w-8 mb-2 text-brand-secondary" />
                    <span className="text-sm text-brand-secondary">
                      Cliquez pour télécharger
                    </span>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </Label>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Planification */}
          <Card>
            <CardHeader>
              <CardTitle>Planification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Label htmlFor="publish-date">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Date de publication
                </Label>
                <Input
                  id="publish-date"
                  type="datetime-local"
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
      </div>
        </div>
      </div>
    </div>
  );
}
