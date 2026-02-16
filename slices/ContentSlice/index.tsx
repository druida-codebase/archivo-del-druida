"use client";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps, JSXMapSerializer } from "@prismicio/react";
import { Navbar } from "@/components/Navbar";
import { FadeIn } from "@/components/FadeIn";
import { PrismicNextImage } from "@prismicio/next";
import { useState, useEffect } from "react";

const components: JSXMapSerializer = {
  heading1: ({ children }) => <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#040404] tracking-tight">{children}</h1>,
  heading2: ({ children }) => <h2 className="text-3xl font-bold mb-4 text-[#040404]">{children}</h2>,
  paragraph: ({ children }) => <p className="mb-6 text-[#333] leading-relaxed text-lg font-serif">{children}</p>,
  listItem: ({ children }) => <li className="mb-2 text-[#333] ml-4 list-disc">{children}</li>,
};

const greyComponents: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className="text-sm text-gray-500 mb-2  tracking-[0.2em] font-medium">
      {children}
    </p>
  ),
};

export type CreacionSliceProps = SliceComponentProps<Content.CreacionSliceSlice> & {
  blogPosts: any[];
};

const CreacionSlice = ({ slice, blogPosts }: CreacionSliceProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-col items-center bg-[#f8f8f8] min-h-screen pb-20 px-4"
    >
      <Navbar blogPosts={blogPosts} variant="solid" />

      <div className="max-w-4xl w-full flex flex-col items-center pt-32 md:pt-40">
        
        {/* Header Section */}
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-7xl font-bold text-[#040404] mb-4 tracking-tighter">
              {slice.primary.title}
            </h2>
            <div className="h-1 w-20 bg-[#7c5139] mx-auto mt-6" />
          </div>
        </FadeIn>

        {/* Main Image */}
        <FadeIn>
          <div className="my-10 w-full group relative">
            {loading && (
              <div className="w-full h-[600px] bg-gray-200 animate-pulse rounded-sm absolute inset-0 z-10" />
            )}
            
            <div className={`overflow-hidden rounded-sm shadow-2xl transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
              <PrismicNextImage 
                field={slice.primary.heroimg} 
                className="w-full h-auto object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                onLoad={handleImageLoad}
                priority
              />
            </div>
            
            {slice.primary.legend && !loading && (
              <div className="mt-6 text-center border-t border-gray-200 pt-4">
                <PrismicRichText field={slice.primary.legend} components={greyComponents} />
              </div>
            )}
          </div>
        </FadeIn>

        {/* Main Content Area */}
        <div className={`w-full transition-all duration-700 ${loading ? 'opacity-20 blur-sm' : 'opacity-100 blur-0'}`}>
          <article className="prose prose-slate lg:prose-xl max-w-none w-full mt-12 px-2">
            <PrismicRichText field={slice.primary.content} components={components} />
          </article>

          <div className="mt-20 pt-10 border-t border-gray-200 w-full text-center">
            <p className="text-gray-400 italic mb-4">¿Te gusta esta pieza?</p>
            <button className="px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-[#7c5139] transition-colors">
              Apoya al artista en Patreon
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreacionSlice;