"use client";

import { useState, useMemo } from "react";
import Link from "next/link"; 
import { LuMenu, LuX, LuSearch } from "react-icons/lu";
import { Content } from "@prismicio/client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
} from "@radix-ui/react-dialog";
import Logo from "./Logo";

type NavbarProps = {
  blogPosts?: Content.BlogDocument[];
};

export function Navbar({ blogPosts = [] }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { title: "Sobre esto", href: "#about" },
    { title: "Creaciones", href: "#creations" },
    { title: "Abalorios", href: "#beads" },
    { title: "Archivo", href: "#archive" },
    { title: "Equipo", href: "#team" },
  ];

  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) return blogPosts;
    
    const query = searchQuery.toLowerCase();
    return blogPosts.filter(post => {
      // Use 'as any' to bypass strict checking on the data object
      const data = post.data as any;
      const titleField = data?.title;
      
      let title = "";
      if (Array.isArray(titleField)) {
        title = titleField[0]?.text || "";
      } else if (typeof titleField === "string") {
        title = titleField;
      }
      
      return title.toLowerCase().includes(query);
    });
  }, [searchQuery, blogPosts]);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between p-6 transition-all">
      <Link href="/" className="shrink-0 hover:scale-105 transition-transform">
        <Logo className="h-8 w-auto fill-white text-white" /> 
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="text-sm font-semibold uppercase tracking-widest text-white/90 hover:text-white transition-colors font-sans"
          >
            {link.title}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
          <DialogTrigger className="hidden md:flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all">
            <LuSearch className="size-5" />
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md" />
            <DialogContent className="fixed top-[20%] left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
              <DialogTitle className="sr-only">Search blogs</DialogTitle>
              <DialogDescription className="sr-only">
                Search through our blog posts
              </DialogDescription>
              
              <div className="flex items-center gap-3 mb-4">
                <LuSearch className="size-5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="flex-1 text-lg bg-transparent border-none outline-none text-gray-900 placeholder-gray-400"
                />
                <DialogClose className="text-gray-400 hover:text-gray-600 transition-colors">
                  <LuX className="size-6" />
                </DialogClose>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {filteredBlogs.length > 0 ? (
                  <ul className="space-y-1">
                    {filteredBlogs.map((post) => {
                      const data = post.data as any;
                      return (
                        <li key={post.id}>
                          <Link
                            href={`/blog/${post.uid}`}
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchQuery("");
                            }}
                            className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <span className="text-gray-900 font-medium">
                              {Array.isArray(data?.title) 
                                ? data.title[0]?.text || 'Untitled'
                                : (data?.title as string) || 'Untitled'}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="px-4 py-8 text-center text-gray-500">
                    {searchQuery ? 'No blogs found' : 'Start typing to search...'}
                  </p>
                )}
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>

        <button className="hidden md:block text-sm font-bold text-white bg-white/10 px-5 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all">
          Sign In
        </button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="md:hidden flex size-10 items-center justify-center rounded-full bg-white/10 text-white">
            <LuMenu className="size-6" />
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
            <DialogContent className="fixed inset-y-0 right-0 z-50 w-full bg-black p-8 shadow-xl">
              <div className="flex justify-between items-center mb-12">
                <Logo className="h-6 fill-white" />
                <DialogClose className="text-white">
                  <LuX className="size-8" />
                </DialogClose>
              </div>
              <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-3xl font-bold text-white font-sans"
                  >
                    {link.title}
                  </Link>
                ))}
                <hr className="border-white/10 my-4" />
                <button className="text-left text-2xl font-bold text-[#8C3A7D]">
                  Sign In
                </button>
              </nav>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    </header>
  );
}