"use client";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps, JSXMapSerializer } from "@prismicio/react";
import { Navbar } from "@/components/Navbar";
import { FadeIn } from "@/components/FadeIn";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { useState, useEffect } from "react";
import {
  SkeletonText,
  SkeletonImage,
} from "skeleton-elements/react";
import "skeleton-elements/css";

const components: JSXMapSerializer = {
  heading1: ({ children }) => <h1 className="text-4xl font-bold mb-6 text-[#040404]">{children}</h1>,
  heading2: ({ children }) => <h2 className="text-3xl font-bold mb-4 text-[#040404]">{children}</h2>,
  heading3: ({ children }) => <h3 className="text-2xl font-bold mb-3 text-[#040404]">{children}</h3>,
  paragraph: ({ children }) => <p className="mb-4 text-[#040404] leading-relaxed">{children}</p>,
  listItem: ({ children }) => <li className="mb-2 text-[#040404]">{children}</li>,
  oListItem: ({ children }) => <li className="mb-2 text-[#040404]">{children}</li>,
};

const greyComponents: JSXMapSerializer = {
  paragraph: ({ children }) => <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">{children}</p>,
};

export type BlogSliceProps = SliceComponentProps<Content.BlogSliceSlice> & {
  blogPosts: any[];
};

const BlogSlice = ({ slice, blogPosts }: BlogSliceProps) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-col items-center bg-[#f1f1f1] min-h-screen pb-20 px-4"
    >
      <Navbar blogPosts={blogPosts} variant="solid" />

      <div className="max-w-3xl w-full flex flex-col items-center pt-32">
        <FadeIn>
          <div className="text-center">
            <PrismicRichText field={slice.primary.pretitle} components={greyComponents} />
            <h2 className="text-center text-5xl font-bold text-[#040404] mb-4">
              {slice.primary.title}
            </h2>
            <PrismicRichText field={slice.primary.subtitle} components={components} />
          </div>
        </FadeIn>

        {/* Hero Image with Skeleton */}
        <FadeIn>
          <div className="my-10 w-full relative">
            {loading && (
              <div className="w-full absolute inset-0 z-10">
                <SkeletonImage 
                  effect="wave" 
                  style={{ width: '100%', height: '500px' }}
                  className="rounded-xl"
                />
              </div>
            )}
            
            <div className={`transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
              <PrismicNextImage 
                field={slice.primary.bloghero} 
                className="rounded-xl shadow-lg w-full object-cover max-h-[500px]"
                onLoadingComplete={handleImageLoad}
              />
            </div>
            
            {!loading && (
              <div className="mt-3 text-center">
                <PrismicRichText field={slice.primary.legend} components={greyComponents} />
              </div>
            )}
          </div>
        </FadeIn>

        {/* Main Content */}
        {!loading ? (
          <>
            <article className="prose prose-slate max-w-none w-full mb-16">
              <PrismicRichText field={slice.primary.maincontent} components={components} />
            </article>

            <div className="space-y-16 w-full">
              {slice.primary.repeatablecontent.map((item, index) => (
                <div key={`repeatable-${index}`} className="flex flex-col gap-4">
                  <PrismicNextImage field={item.repeaterimg} className="rounded-lg w-full" />
                  <PrismicRichText field={item.repeaterlegend} components={greyComponents} />
                  <PrismicRichText field={item.repeatertext} components={components} />
                </div>
              ))}
            </div>

            {slice.primary.youtubeembed?.html && (
              <div
                className="w-full aspect-video my-12 rounded-xl overflow-hidden shadow-xl [&>iframe]:w-full [&>iframe]:h-full"
                dangerouslySetInnerHTML={{
                  __html: slice.primary.youtubeembed.html,
                }}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20 w-full border-t border-gray-300 pt-10">
              {slice.primary.linksgroup.map((item, index) => (
                <div key={`link-${index}`} className="group flex flex-col">
                  <PrismicNextImage field={item.linkthumbnail} className="rounded-md mb-4 grayscale group-hover:grayscale-0 transition-all" />
                  <h5 className="text-xl font-semibold text-[#040404] mb-2">{item.linktitle}</h5>
                  <PrismicRichText field={item.linkdescription} components={components} />
                  <PrismicNextLink 
                    field={item.link} 
                    className="text-blue-600 font-medium hover:underline mt-auto"
                  >
                    Read More →
                  </PrismicNextLink>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="w-full space-y-4">
            <SkeletonText effect="wave">
              <div className="h-6 w-full bg-gray-200 rounded" />
            </SkeletonText>
            <SkeletonText effect="wave">
              <div className="h-6 w-full bg-gray-200 rounded" />
            </SkeletonText>
            <SkeletonText effect="wave">
              <div className="h-6 w-3/4 bg-gray-200 rounded" />
            </SkeletonText>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSlice;