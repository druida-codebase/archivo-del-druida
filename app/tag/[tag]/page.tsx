import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import * as prismic from "@prismicio/client";
import Link from "next/link";
import { PrismicNextImage } from "@prismicio/next";
import { FadeIn } from "@/components/FadeIn";

type Params = Promise<{ tag: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `${decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1)} | El Archivo del Druida`,
  };
}

export default async function TagPage({ params }: { params: Params }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag).toLowerCase();
  const client = createClient();

  try {
    const posts = await client.getAllByType("blog", {
      filters: [prismic.filter.at("document.tags", [decodedTag])],
      orderings: [{ field: "document.first_publication_date", direction: "desc" }],
    });

    if (posts.length === 0) notFound();

    return (
      <main className="bg-[#f1f1f1] min-h-screen">
        <div className="h-[45vh] w-full bg-[#040404] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          <FadeIn>
            <h1 className="text-5xl md:text-7xl text-white font-bold tracking-tighter capitalize relative z-10 px-4 text-center">
              {decodedTag}
            </h1>
          </FadeIn>
        </div>

        <section className="py-20 px-4 flex flex-col items-center">
          <div className="max-w-6xl w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const blogSlice = post.data?.slices?.find(
                  (s: any) => s.slice_type === "blog_slice"
                );

                const title = blogSlice?.primary?.title || "Untitled";
                const image = blogSlice?.primary?.bloghero;

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

                          <div className="mt-auto pt-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#040404] border-b-2 border-[#040404] w-fit pb-1 group-hover:text-[#8C3A7D] group-hover:border-[#8C3A7D] transition-all">
                              Leer Historia
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    notFound();
  }
}