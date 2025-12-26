/**
 * WordPress REST API Type Definitions
 * These types match the WordPress REST API v2 schema
 */

export interface WordPressConfig {
  siteUrl: string;
  username: string;
  applicationPassword: string;
}

export interface WordPressPost {
  id?: number;
  date?: string;
  date_gmt?: string;
  modified?: string;
  modified_gmt?: string;
  slug?: string;
  status: 'publish' | 'future' | 'draft' | 'pending' | 'private';
  type?: string;
  link?: string;
  title: {
    rendered?: string;
    raw?: string;
  };
  content: {
    rendered?: string;
    raw?: string;
    protected?: boolean;
  };
  excerpt: {
    rendered?: string;
    raw?: string;
    protected?: boolean;
  };
  author?: number;
  featured_media?: number;
  comment_status?: 'open' | 'closed';
  ping_status?: 'open' | 'closed';
  sticky?: boolean;
  template?: string;
  format?: string;
  meta?: Record<string, any>;
  categories?: number[];
  tags?: number[];
}

export interface WordPressCategory {
  id?: number;
  count?: number;
  description?: string;
  link?: string;
  name: string;
  slug?: string;
  taxonomy?: string;
  parent?: number;
  meta?: Record<string, any>;
}

export interface WordPressTag {
  id?: number;
  count?: number;
  description?: string;
  link?: string;
  name: string;
  slug?: string;
  taxonomy?: string;
  meta?: Record<string, any>;
}

export interface WordPressMedia {
  id?: number;
  date?: string;
  date_gmt?: string;
  modified?: string;
  modified_gmt?: string;
  slug?: string;
  status?: string;
  type?: string;
  link?: string;
  title?: {
    rendered?: string;
    raw?: string;
  };
  author?: number;
  comment_status?: string;
  ping_status?: string;
  template?: string;
  meta?: Record<string, any>;
  description?: {
    rendered?: string;
    raw?: string;
  };
  caption?: {
    rendered?: string;
    raw?: string;
  };
  alt_text?: string;
  media_type?: string;
  mime_type?: string;
  media_details?: {
    width?: number;
    height?: number;
    file?: string;
    sizes?: Record<string, any>;
    image_meta?: Record<string, any>;
  };
  post?: number;
  source_url?: string;
}

export interface WordPressError {
  code: string;
  message: string;
  data?: {
    status?: number;
    params?: Record<string, any>;
  };
}

export interface WordPressApiResponse<T> {
  success: boolean;
  data?: T;
  error?: WordPressError;
}

export interface CreatePostParams {
  title: string;
  content: string;
  excerpt?: string;
  status?: 'publish' | 'draft' | 'pending' | 'private';
  categories?: number[];
  tags?: number[];
  featuredMediaId?: number;
  slug?: string;
  date?: string;
}

export interface UpdatePostParams extends Partial<CreatePostParams> {
  id: number;
}

export interface UploadMediaParams {
  file: File;
  title?: string;
  alt_text?: string;
  caption?: string;
  description?: string;
}
