import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  User,
  ArrowRight,
  X,
  Share2,
  Sparkles,
} from 'lucide-react';
import { Language, BlogPost } from '../../types';
import { translations } from '../../i18n/translations';

interface BlogSectionProps {
  lang: Language;
  posts: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ lang, posts }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const t = translations[lang];

  return (
    <section id="blog-section" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.blog.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.blog.subtitle}
          </h2>
        </div>

        {/* 3 Featured Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={post.coverImage}
                    alt={post.titleFr}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 ltr:left-3 rtl:right-3 bg-slate-950/80 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-md">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{post.publishedAt}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                    {lang === 'ar' ? post.titleAr : lang === 'fr' ? post.titleFr : post.titleEn}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {lang === 'ar' ? post.excerptAr : lang === 'fr' ? post.excerptFr : post.excerptEn}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-bold group-hover:text-emerald-800">
                <span>{t.blog.readMore}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>

        {/* Read Article Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                  {selectedPost.category}
                </span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {lang === 'ar' ? selectedPost.titleAr : lang === 'fr' ? selectedPost.titleFr : selectedPost.titleEn}
                </h2>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>{selectedPost.author}</span>
                  <span>•</span>
                  <span>{selectedPost.publishedAt}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              <img
                src={selectedPost.coverImage}
                alt={selectedPost.titleFr}
                referrerPolicy="no-referrer"
                className="w-full h-64 object-cover rounded-2xl"
              />

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-4">
                {lang === 'ar' ? selectedPost.contentAr : lang === 'fr' ? selectedPost.contentFr : selectedPost.contentEn}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold"
                >
                  {lang === 'ar' ? 'إغلاق المقال' : 'Fermer'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
