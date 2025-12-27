import { Button } from '@/components/ui/button';
import { BookOpen, Building2, PenSquare } from 'lucide-react';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { CreateBlogPost } from './features/blog-editor';
import { BlogViewer } from './features/blog-viewer';
import { RealEstatePage } from './features/real-estate/RealEstatePage';

function App() {
  const [activeView, setActiveView] = useState<'viewer' | 'editor' | 'real-estate'>('real-estate');

  return (
    <>
      <Toaster position="top-right" />
      
      {/* Navigation Header */}
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-gold bg-clip-text text-transparent">
              {activeView === 'real-estate' ? 'Luxe Estates' : 'Mon Blog'}
            </h1>
            
            <div className="flex gap-2">
              <Button
                variant={activeView === 'real-estate' ? 'default' : 'outline'}
                onClick={() => setActiveView('real-estate')}
                className={`gap-2 ${activeView === 'real-estate' ? 'bg-brand-primary-navy hover:bg-brand-primary' : ''}`}
              >
                <Building2 className="h-4 w-4" />
                Agency
              </Button>
              <Button
                variant={activeView === 'viewer' ? 'default' : 'outline'}
                onClick={() => setActiveView('viewer')}
                className="gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Blog
              </Button>
              <Button
                variant={activeView === 'editor' ? 'default' : 'outline'}
                onClick={() => setActiveView('editor')}
                className="gap-2"
              >
                <PenSquare className="h-4 w-4" />
                Editor
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen">
        {activeView === 'viewer' && <BlogViewer />}
        {activeView === 'editor' && <CreateBlogPost />}
        {activeView === 'real-estate' && <RealEstatePage />}
      </div>
    </>
  );
}

export default App;
