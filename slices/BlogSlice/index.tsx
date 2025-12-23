import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Navbar } from "@/components/Navbar";
import { createClient } from "@/prismicio";
import { FadeIn } from "@/components/FadeIn";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

/**
 * Props for `BlogSlice`.
 */
export type BlogSliceProps = SliceComponentProps<Content.BlogSliceSlice>;

/**
 * Component for "BlogSlice" Slices.
 */
const BlogSlice = async ({ slice }: BlogSliceProps) => {
  const client = createClient();
  
  // Fetching the blog posts for the search bar
  const blogPosts = await client.getAllByType("blog");

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Navbar blogPosts={blogPosts} />

      <FadeIn>
        <PrismicRichText field={slice.primary.pretitle} />
        <h2>{slice.primary.title}</h2>
        <PrismicRichText field={slice.primary.subtitle} />
      </FadeIn>

      <FadeIn>
        <PrismicNextImage field={slice.primary.bloghero} />
        <PrismicRichText field={slice.primary.legend} />
      </FadeIn>

      <PrismicRichText field={slice.primary.maincontent} />

      {slice.primary.repeatablecontent.map((item, index) => (
        <div key={`repeatable-${index}`}>
          <PrismicNextImage field={item.repeaterimg} />
          <PrismicRichText field={item.repeaterlegend} />
          <PrismicRichText field={item.repeatertext} />
        </div>
      ))}

      {slice.primary.youtubeembed?.html && (
        <div
          dangerouslySetInnerHTML={{
            __html: slice.primary.youtubeembed.html,
          }}
        />
      )}

      {slice.primary.linksgroup.map((item, index) => (
        <div key={`link-${index}`}>
          <PrismicNextImage field={item.linkthumbnail} />
          <h5>{item.linktitle}</h5>
          <PrismicRichText field={item.linkdescription} />
          <PrismicNextLink field={item.link} />
        </div>
      ))}
    </section>
  );
};

export default BlogSlice;