"use client"

import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface FadeInProps extends gsap.TweenVars {
    children: ReactNode;
    className?: string;
    targetChildren?: boolean;
}

export function FadeIn({ children, className, targetChildren, ...vars }: FadeInProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const target = targetChildren 
            ? containerRef.current?.children 
            : containerRef.current;

        if (!target) return;

        const mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.set(target, {
                opacity: 0,
                y: 60,
            });

            gsap.to(target, {
                duration: 0.8,
                opacity: 1,
                ease: "power3.out",
                y: 0,
                stagger: 0.2,
                ...vars,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={clsx(className)}>
            {children}
        </div>
    );
}