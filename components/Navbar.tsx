"use client";

import { useState, useMemo, useEffect } from "react";
import { createClient } from "@/prismicio";
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
  variant?: "solid" | "floating";
};

export function Navbar({ variant = "solid", blogPosts: initialPosts }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [blogPosts, setBlogPosts] = useState<Content.BlogDocument[]>(initialPosts || []);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (initialPosts && initialPosts.length > 0) {
      setBlogPosts(initialPosts);
      return;
    }

    const fetchBlogs = async () => {
      const client = createClient();
      const posts = await client.getAllByType("blog");
      setBlogPosts(posts);
    };
    fetchBlogs();
  }, [initialPosts]);

  useEffect(() => {
    if (variant !== "floating") return;
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      setIsScrolled(window.scrollY > viewportHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [variant]);

  const bgClasses = variant === "solid" 
    ? "bg-black/40 backdrop-blur-xl border-b border-white/10"
    : variant === "floating" && isScrolled
      ? "bg-black/40 backdrop-blur-xl border-b border-white/10" 
      : "bg-transparent border-b-transparent";

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
      const data = post.data as any;
      const blogSlice = data?.slices?.find((slice: any) => slice.slice_type === 'blog_slice');
      const title = blogSlice?.primary?.title || '';
      return title.toLowerCase().includes(query);
    });
  }, [searchQuery, blogPosts]);

  return (
    <header className={`fixed top-0 right-0 left-0 z-[100] flex items-center justify-between p-6 transition-colors duration-500 ${bgClasses}`}>
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
            <DialogContent className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[110] w-full max-w-2xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
              <DialogTitle className="sr-only">Search blogs</DialogTitle>
              <DialogDescription className="sr-only">Search through our blog posts</DialogDescription>
              
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
                  filteredBlogs.map((post) => {
                    const data = post.data as any;
                    const blogSlice = data?.slices?.find((slice: any) => slice.slice_type === 'blog_slice');
                    const title = blogSlice?.primary?.title || 'Untitled';
                    return (
                      <li key={post.id} className="list-none">
                        <Link
                          href={`/blog/${post.uid}`}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <span className="text-gray-900 font-medium">{title}</span>
                        </Link>
                      </li>
                    );
                  })
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
            <DialogOverlay className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm" />
            <DialogContent className="fixed inset-y-0 right-0 z-[110] w-full bg-black p-8 shadow-xl">
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