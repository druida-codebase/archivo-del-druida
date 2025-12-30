import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = await params;
  const client = createClient();

  try {
    // 1. Log the UID being searched
    console.log("🔍 Attempting to fetch contentpage with UID:", uid);

    const page = await client.getByUID("contentpage", uid);

    return (
      <main className="pt-24"> 
        <SliceZone slices={page.data.slices} components={components} />
      </main>
    );
  } catch (error) {
    // 2. Log the exact error if it fails
    console.error(`❌ Error fetching page for UID: ${uid}. Check if 'contentpage' is the correct API ID.`);
    notFound();
  }
}