import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import * as prismic from "@prismicio/client";
import Link from "next/link";
import { PrismicNextImage } from "@prismicio/next";

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag).toLowerCase();
  const client = createClient();

  try {
    // We query the "blog" type, filtering by the tags array
    const posts = await client.getAllByType("blog", {
      filters: [prismic.filter.at("document.tags", [decodedTag])],
      orderings: [{ field: "document.first_publication_date", direction: "desc" }],
    });

    if (posts.length === 0) notFound();

    return (
      <main className="pt-24 px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 capitalize">Etiqueta: {decodedTag}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => {
            // Manual data extraction from your blog slices
            const blogData = post.data.slices.find((s: any) => s.slice_type === "blog_slice")?.primary;

            return (
              <Link key={post.id} href={`/blog/${post.uid}`} className="group">
                {blogData?.bloghero && (
                   <div className="aspect-video overflow-hidden rounded-xl mb-4">
                     <PrismicNextImage field={blogData.bloghero} className="object-cover w-full h-full" />
                   </div>
                )}
                <h2 className="text-xl font-bold group-hover:text-[#8C3A7D]">{blogData?.title || "Untitled"}</h2>
              </Link>
            );
          })}
        </div>
      </main>
    );
  } catch (e) {
    notFound();
  }
}