"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { FadeIn } from "@/components/FadeIn";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center bg-[#f1f1f1] min-h-[60dvh] pb-20 px-4">
      <Navbar blogPosts={[]} variant="solid" />

      <div className="max-w-3xl w-full flex flex-col items-center pt-32">
        <FadeIn>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2 tracking-wide uppercase">
              Error 404
            </p>
            <h2 className="text-center text-5xl font-bold text-[#040404] mb-4">
              Perdido en el archivo
            </h2>
            <p className="mb-8 text-[#040404] leading-relaxed text-lg">
              Lo sentimos, no hemos podido encontrar la pieza que buscas. 
              Quizás se ha movido a una sección más profunda del archivo.
            </p>
            
            <Link 
              href="/"
              className="px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-[#7c5139] transition-colors inline-block"
            >
              Volver al Inicio
            </Link>
          </div>
        </FadeIn>       
      </div>

     
    </section>
  );
}