import React, { useState } from 'react';
import { BlogEditor } from './BlogEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { 
  Save, 
  Eye, 
  Upload,
  Tag,
  Calendar
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function CreateBlogPost() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [status, setStatus] = useState('draft');
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);

  const categories = ['Technologie', 'Lifestyle', 'Voyage', 'Cuisine', 'Sport'];

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
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const post = {
      title,
      excerpt,
      content,
      category,
      tags,
      status,
      featuredImage,
      createdAt: new Date().toISOString(),
    };
    console.log('Article sauvegardé:', post);
    // Ici, vous enverriez les données à votre API
  };

  const handlePreview = () => {
    // Logique pour la prévisualisation
    console.log('Prévisualisation:', { title, content });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Créer un nouvel article</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Prévisualiser
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-2" />
            Publier
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-6">
          {/* Titre */}
          <Card>
            <CardContent className="pt-6">
              <Input
                placeholder="Titre de l'article"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-2xl font-bold border-none focus-visible:ring-0"
              />
            </CardContent>
          </Card>

          {/* Éditeur */}
          <Card>
            <CardHeader>
              <CardTitle>Contenu</CardTitle>
            </CardHeader>
            <CardContent>
              <BlogEditor
                content={content}
                onChange={setContent}
                placeholder="Commencez à écrire votre article ici..."
              />
            </CardContent>
          </Card>

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
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="published">Publié</SelectItem>
                  <SelectItem value="scheduled">Planifié</SelectItem>
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
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat.toLowerCase()}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

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
                    <Upload className="h-8 w-8 mb-2 text-gray-400" />
                    <span className="text-sm text-gray-500">
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
  );
}
