import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function BlogPost({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("blog", uid).catch(() => notFound());

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blog");

  return pages.map((page) => ({
    uid: page.uid,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("blog", uid).catch(() => notFound());

  const blogSlice = page.data.slices?.find((slice: any) => slice.slice_type === 'blog_slice');
  const title = blogSlice?.primary?.title || page.data.meta_title || "Blog Post";

  return {
    title: title,
    description: page.data.meta_description,
  };
}