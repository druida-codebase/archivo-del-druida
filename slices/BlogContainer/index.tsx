"use client";

import { FC, useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps, JSXMapSerializer } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next"; 
import { createClient } from "@/prismicio";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";

const components: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className="text-[#040404] leading-relaxed line-clamp-3 text-sm">
      {children}
    </p>
  ),
};

export type BlogContainerProps = SliceComponentProps<Content.BlogContainerSlice>;

const BlogContainer: FC<BlogContainerProps> = ({ slice }) => {
  const [blogPosts, setBlogPosts] = useState<Content.BlogDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const client = createClient();
      const posts = await client.getAllByType("blog");
      setBlogPosts(posts);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-20 px-4 bg-[#f1f1f1] flex flex-col items-center"
    >
      <div className="max-w-6xl w-full">
        {slice.primary.title && (
          <h2 className="text-4xl font-bold text-[#040404] mb-12 text-center">
            {slice.primary.title}
          </h2>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                <div className="aspect-[16/10] bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => {
              const blogSlice = post.data?.slices?.find(
                (s: any) => s.slice_type === 'blog_slice'
              );

              const title = blogSlice?.primary?.title || "Untitled";
              const image = blogSlice?.primary?.bloghero;
              const description = blogSlice?.primary?.subtitle || blogSlice?.primary?.pretitle;

              return (
                <FadeIn key={post.id}>
                  <Link href={`/blog/${post.uid}`} className="group block h-full">
                    <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="aspect-[16/10] overflow-hidden bg-gray-200">
                        {image?.url ? (
                          <PrismicNextImage 
                            field={image} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 uppercase tracking-tighter text-xs">
                            No Image
                          </div>
                        )}
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-xl font-bold text-[#040404] mb-2 group-hover:text-[#8C3A7D] transition-colors line-clamp-2">
                          {title}
                        </h3>
                        
                        <div className="flex-1 mb-6">
                          {description && description.length > 0 ? (
                            <PrismicRichText field={description} components={components} />
                          ) : (
                            <p className="text-gray-400 text-sm">No description available</p>
                          )}
                        </div>

                        <div className="mt-auto">
                          <span className="text-xs font-bold uppercase tracking-widest text-[#040404] border-b-2 border-[#040404] w-fit pb-1 group-hover:text-[#8C3A7D] group-hover:border-[#8C3A7D] transition-all">
                            Read Story
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogContainer;