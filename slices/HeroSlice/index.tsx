"use client";

import { FC, useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { FadeIn } from "@/components/FadeIn";
import { Loader } from "@/components/Loader";

export type HeroSliceProps = SliceComponentProps<Content.HeroSliceSlice>;

const HeroSlice: FC<HeroSliceProps> = ({ slice }) => {
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const hasShownLoader = sessionStorage.getItem("loaderShown");
    
    if (hasShownLoader) {
      setShowLoader(false);
      setLoaderComplete(true);
    }
  }, []);

  const handleLoaderComplete = () => {
    setLoaderComplete(true);
    sessionStorage.setItem("loaderShown", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("loading");

  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      setStatus("success");
      setEmail("");
      // Optional: Reset status after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      console.error('Subscription failed:', data.error);
      setStatus("error");
    }
  } catch (err) {
    console.error('Network error:', err);
    setStatus("error");
  }
};

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden font-sans"
    >
      {showLoader && <Loader onComplete={handleLoaderComplete} />}
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <PrismicNextImage 
          field={slice.primary.backgroundimage} 
          fill 
          className="object-cover object-center"
          priority 
        />
        <div className="absolute inset-0 bg-black/20 z-[1]" /> 
      </div>
      
      {/* Content Layer */}
      {loaderComplete && (
        <div className="relative z-10 flex flex-col items-center gap-8 top-[-5%]">
          <FadeIn>
            <h1 className="text-6xl md:text-[4.3rem] text-white text-center px-4 tracking-tighter">
              {slice.primary.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 w-full max-w-md px-6">
              <input
                type="email"
                placeholder="Únete al archivo (email)..."
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/60 outline-none focus:border-white/50 transition-all text-sm"
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="px-8 py-3 rounded-full bg-white text-black font-bold text-sm hover:scale-105 active:scale-95 transition-all disabled:bg-gray-400"
              >
                {status === "loading" ? "..." : status === "success" ? "✓" : "Suscribirse"}
              </button>
            </form>
            {status === "error" && (
              <p className="text-red-400 text-xs mt-2 text-center font-medium">Algo salió mal. Intenta de nuevo.</p>
            )}
            {status === "success" && (
              <p className="text-white text-xs mt-2 text-center font-medium tracking-widest uppercase">Bienvenido al archivo.</p>
            )}
          </FadeIn>
        </div>
      )}

      {/* Top Foreground Image (Parallax/Overlay effect) */}
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