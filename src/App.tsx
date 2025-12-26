import { Button } from '@/components/ui/button';
import { BookOpen, PenSquare } from 'lucide-react';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { BlogViewer } from './BlogViewer';
import { CreateBlogPost } from './CreateBlogPost';

function App() {
  const [activeView, setActiveView] = useState<'viewer' | 'editor'>('viewer');

  return (
    <>
      <Toaster position="top-right" />
      
      {/* Navigation Header */}
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mon Blog
            </h1>
            
            <div className="flex gap-2">
              <Button
                variant={activeView === 'viewer' ? 'default' : 'outline'}
                onClick={() => setActiveView('viewer')}
                className="gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Voir les articles
              </Button>
              <Button
                variant={activeView === 'editor' ? 'default' : 'outline'}
                onClick={() => setActiveView('editor')}
                className="gap-2"
              >
                <PenSquare className="h-4 w-4" />
                Créer un article
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen">
        {activeView === 'viewer' ? <BlogViewer /> : <CreateBlogPost />}
      </div>
    </>
  );
}

export default App;
