import { Metadata } from "next"; // Added for types
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client"; // Added to use asText
import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = Promise<{ uid: string }>;


export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  
  try {
    const page = await client.getByUID("contentpage", uid);


    const formattedTitle = page.uid.replaceAll("-", " ");

    return {
      title: formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1) || "Info", 
      description: page.data.meta_description,
    };
  } catch (e) {
    return { title: "Info" };
  }
}

export default async function Page({ params }: { params: Params }) {
  const { uid } = await params;
  const client = createClient();

  try {
    console.log("🔍 Attempting to fetch contentpage with UID:", uid);
    const page = await client.getByUID("contentpage", uid);

    return (
      <main className="pt-24"> 
        <SliceZone slices={page.data.slices} components={components} />
      </main>
    );
  } catch (error) {
    console.error(`❌ Error fetching page for UID: ${uid}.`);
    notFound();
  }
}