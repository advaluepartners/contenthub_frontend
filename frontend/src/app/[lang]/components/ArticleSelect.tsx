'use client';
import Link from 'next/link';
import { useState, useRef } from 'react';

interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    articles: {
      data: Array<{}>;
    };
  };
}

interface Article {
  id: number;
  attributes: {
    title: string;
    slug: string;
  };
}

function selectedFilter(current: string, selected: string) {
  return current === selected
    ? 'bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600 transition-colors duration-200'
    : 'bg-purple-400 text-white px-3 py-1 rounded-lg hover:bg-purple-500 transition-colors duration-200';
}

export default function ArticleSelect({ categories, articles, params }: { categories: Category[]; articles: Article[]; params: { slug: string; category: string; }; }) {
  const [searchTerm, setSearchTerm] = useState('');
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredArticles = searchTerm
    ? articles.filter(article => article.attributes.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : articles;

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="p-4 rounded-lg bg-white min-h-[365px] relative">
      <h4 className="text-xl font-semibold mb-4">Browse By Category</h4>
      <div className="flex flex-wrap py-6 space-x-2">
        {categories.map((category) => (
          <Link key={category.id} href={`/blog/${category.attributes.slug}`} legacyBehavior>
            <a className={selectedFilter(category.attributes.slug, params.category)}>
              {category.attributes.name}
            </a>
          </Link>
        ))}
      </div>

      <h4 className="text-lg font-semibold mb-4">Other Posts You May Like</h4>
      <div className="relative">
        <button onClick={handlePrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <div ref={carouselRef} className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-4 mt-4">
          {filteredArticles.map((article) => (
            <div key={article.id} className="snap-center shrink-0 w-64 h-64 bg-[#FDF0DF] text-gray-600 p-4 rounded-lg flex-none">
              <Link href={`/blog/${params.category}/${article.attributes.slug}`} legacyBehavior>
                <a className="block">
                  {article.attributes.title}
                </a>
              </Link>
            </div>
          ))}
        </div>
        <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>

      <div className="mt-4">
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search blogs..." className="w-full p-2 border rounded-lg" />
      </div>
    </div>
  );
}









// 'use client';
// import Link from "next/link";
// import { useState } from "react";

// interface Category {
//   id: number;
//   attributes: {
//     name: string;
//     slug: string;
//     articles: {
//       data: Array<{}>;
//     };
//   };
// }

// interface Article {
//   id: number;
//   attributes: {
//     title: string;
//     slug: string;
//   };
// }

// function selectedFilter(current: string, selected: string) {
//   return current === selected
//     ? "bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600 transition-colors duration-200"
//     : "bg-purple-400 text-white px-3 py-1 rounded-lg hover:bg-purple-500 transition-colors duration-200";
// }

// export default function ArticleSelect({
//   categories,
//   articles,
//   params,
// }: {
//   categories: Category[];
//   articles: Article[];
//   params: {
//     slug: string;
//     category: string;
//   };
// }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [visibleIndex, setVisibleIndex] = useState(0);

//   const filteredArticles = searchTerm
//     ? articles.filter(article =>
//         article.attributes.title.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : articles;

//   // Calculate visible articles based on screen size
//   const slidesToShow = window.innerWidth > 768 ? 3 : window.innerWidth > 640 ? 2 : 1;
//   const visibleArticles = filteredArticles.slice(visibleIndex, visibleIndex + slidesToShow);

//   const handlePrev = () => {
//     setVisibleIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
//   };

//   const handleNext = () => {
//     setVisibleIndex((prevIndex) => (prevIndex + slidesToShow < filteredArticles.length ? prevIndex + 1 : prevIndex));
//   };

//   return (
//     <div className="p-4 rounded-lg bg-white min-h-[365px] relative">
//       <h4 className="text-xl font-semibold mb-4">Browse By Category</h4>
//       <div className="flex flex-wrap py-6 space-x-2">
//         {categories.map((category: Category, index: number) => (
//           <Link
//             key={category.id}
//             href={`/blog/${category.attributes.slug}`}
//             className={selectedFilter(category.attributes.slug, params.category)}
//           >
//             {category.attributes.name}
//           </Link>
//         ))}
//       </div>

//       <h4 className="text-lg font-semibold mb-4">Other Posts You May Like</h4>
//       <div className="flex justify-between items-center">
//         <button onClick={handlePrev} disabled={visibleIndex === 0}>Prev</button>
//         <div className="flex space-x-4">
//           {visibleArticles.map((article: Article) => (
//             <div key={article.id} className="bg-[#FDF0DF] text-gray 600 p-4 rounded-lg flex items-center justify-center" style={{ minHeight: '200px' }}>
//               <Link href={`/blog/${params.category}/${article.attributes.slug}`}>
//                 {article.attributes.title}
//               </Link>
//             </div>
//           ))}
//         </div>
//         <button onClick={handleNext} disabled={visibleIndex + slidesToShow >= filteredArticles.length}>Next</button>
//       </div>

//       <div className="mt-4">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search blogs..."
//           className="w-full p-2 border rounded-lg"
//         />
//       </div>
//     </div>
//   );
// }

