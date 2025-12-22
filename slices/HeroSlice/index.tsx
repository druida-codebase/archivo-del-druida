"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { FadeIn } from "@/components/FadeIn";
import { Loader } from "@/components/Loader";
import { useState } from "react";

/**
 * Props for `HeroSlice`.
 */
export type HeroSliceProps = SliceComponentProps<Content.HeroSliceSlice>;

/**
 * Component for "HeroSlice" Slices.
 */
const HeroSlice: FC<HeroSliceProps> = ({ slice }) => {
  const [loaderComplete, setLoaderComplete] = useState(false);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden font-sans"
    >
      <Loader onComplete={() => setLoaderComplete(true)} />
      
      <div className="absolute inset-0 z-0">
        <PrismicNextImage 
          field={slice.primary.backgroundimage} 
          fill 
          className="object-cover object-center"
          priority 
        />
      </div>
      
      {loaderComplete && (
        <FadeIn className="relative top-[-20%]">
          <h1 className="text-6xl md:text-[4rem] text-white text-center z-10 px-4 transition-all">
            {slice.primary.title}
          </h1>
        </FadeIn>
      )}

      <div className="absolute inset-0 z-20 pointer-events-none">
        <PrismicNextImage 
          field={slice.primary.topimage} 
          fill 
          className="object-cover object-center" 
          priority 
        />
      </div>
    </section>
  );
};
export default HeroSlice;
