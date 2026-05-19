const fs = require('fs');
const path = require('path');

const layoutsDir = path.join(__dirname, 'src/components/post/layouts');
const layouts = fs.readdirSync(layoutsDir).filter(f => f.endsWith('.tsx'));

const getLayoutContent = (name) => `import React from 'react';
import PostMetaData from '../PostMetaData';
import PostShareButtons from '../PostShareButtons';
import { Zap, ArrowDown } from 'lucide-react';

export default function ${name.replace('.tsx', '')}({ post, config = {}, renderSidebar, renderTopMeta }: any) {
  const hasSidebar = config.sidebar_enabled !== false;
  const isLeft = config.sidebar_position === 'left';
  
  const layoutClass = "post-layout w-full px-4" 
    + (hasSidebar ? (isLeft ? " sidebar-left" : "") : " no-sidebar");

  return (
    <main className="post-page min-h-screen pb-12 pt-4 bg-white dark:bg-[#1a1a1a]">
      {renderTopMeta && (
        <div className="max-w-[1400px] mx-auto px-4 mb-4">
          {renderTopMeta()}
        </div>
      )}
      
      <div className={layoutClass}>

        <article className="post-content bg-transparent p-0">
           <header className="mb-6 px-1">
             <h1 className="text-3xl md:text-5xl font-bold text-[#e67e22] leading-tight mb-4 tracking-tight">
               {post.title}
             </h1>
             <div 
               className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-normal mb-8"
               dangerouslySetInnerHTML={{ __html: post.excerpt }}
             />

             {config.show_metadata !== false && (
               <div className="flex items-center mb-6">
                 <PostMetaData 
                   author={post.author}
                   authorAvatar={post.authorAvatar}
                   date={post.date}
                   updatedAt={post.updatedAt}
                   commentsCount={post.commentsCount}
                   views={post.views}
                   readTime={post.readTime}
                 />
               </div>
             )}
             
             {config.share_top !== false && (
               <div className="mb-8 mt-2">
                 <PostShareButtons />
               </div>
             )}
           </header>

           {config.show_featured_image !== false && (
             <div className="mb-8 w-full">
               <img 
                 src={post.image} 
                 alt={post.title} 
                 className="w-full h-auto max-h-[600px] object-cover rounded-xl shadow-sm" 
               />
             </div>
           )}

           <div 
             className="prose md:prose-lg dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-[1.8] font-serif bg-transparent
                        prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-headings:font-sans
                        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-6 
                        prose-h3:text-xl prose-h3:mt-8 
                        prose-p:mb-6 prose-p:text-[17px] md:prose-p:text-[18px]
                        prose-a:text-[#e67e22] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold
                        prose-img:max-w-full prose-img:h-auto prose-img:rounded-xl prose-img:mx-auto prose-img:shadow-sm prose-img:my-8
                        prose-ul:list-disc prose-ul:ml-4 prose-ol:list-decimal prose-ol:ml-4
                        wp-block-image"
             dangerouslySetInnerHTML={{ __html: post.content }} 
           />

           <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-12 py-6 border-y border-gray-100 dark:border-white/10">
             <div className="flex flex-wrap gap-2 justify-center md:justify-start">
               {config.show_categories !== false && (
                 <span className="bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors">#{post.category}</span>
               )}
               {config.show_tags !== false && post.subcategoryName && (
                 <span className="bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors">#{post.subcategoryName}</span>
               )}
             </div>
             {config.show_source_via !== false && (
                <a href="#" className="flex items-center gap-2 px-6 py-2 border border-gray-200 dark:border-white/20 rounded-full hover:bg-gray-50 dark:hover:bg-white/5 transition-colors font-medium">
                  Siga-nos 
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Google_News_icon.png" alt="Google News" className="w-5 h-5 ml-1" />
                </a>
             )}
           </div>

           {config.share_bottom !== false && (
             <div className="flex items-center gap-4 py-8 border-b border-gray-100 dark:border-white/10">
               <span className="font-bold text-gray-700 dark:text-gray-300">Compartilhar</span>
               <PostShareButtons />
             </div>
           )}

           {config.show_author_box !== false && (
             <div className="py-8 border-b border-gray-100 dark:border-white/10 flex items-start gap-6">
               <img src={post.authorAvatar} alt={post.author} className="w-20 h-20 rounded-full object-cover shadow-md" />
               <div>
                 <h3 className="text-xl font-bold text-[#e67e22] mb-2">{post.author}</h3>
                 <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                   Apaixonada por viagens e pela escrita, crio conteúdos que conectam pessoas a destinos de forma leve e inspiradora.
                 </p>
               </div>
             </div>
           )}

        </article>

        {hasSidebar && (
          <aside className="post-sidebar">
            <div className="sticky top-[120px]">
              {renderSidebar()}
            </div>
          </aside>
        )}

      </div>
    </main>
  );
}
`;

layouts.forEach(file => {
  fs.writeFileSync(path.join(layoutsDir, file), getLayoutContent(file));
});
console.log('All layouts replaced successfully.');
