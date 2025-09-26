import { Reveal } from "../Animations";
import React from "react";

export const Section = ({ children, className, ...props }: React.ComponentProps<'section'> & { children: React.ReactNode }) => {
  return (
    <section className={`py-16 lg:py-24 bg-black ${className || ''}`} {...props}>
      <Reveal>
        {children}
      </Reveal>
    </section>
  );
};

export const SectionTitle = ({ children }: { children: React.ReactNode }) => <p className="section-title">{children}</p>;

export const SectionHeading = ({ children }: { children: React.ReactNode }) => <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mt-4">{children}</h2>;

export const SectionDescription = ({ children }: { children: React.ReactNode }) => <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">{children}</p>;
