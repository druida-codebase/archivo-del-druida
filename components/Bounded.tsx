import clsx from "clsx";
import React from "react";

interface BoundedProps {
  as?: React.ElementType;
  fullWidth?: boolean;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}

export default function Bounded({
  as: Comp = "section",
  fullWidth = false,
  className,
  innerClassName,
  children,
}: BoundedProps) {
  return (
    <Comp
      className={clsx(
        "px-6 py-10 md:py-20 [.header+&]:pt-44 [.header+&]:md:pt-32",
        className
      )}
    >
      <div
        className={clsx(
          "mx-auto w-full",
          !fullWidth && "max-w-7xl",
          innerClassName
        )}
      >
        {children}
      </div>
    </Comp>
  );
}