"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/lib/data/projects";

const selection = [...projects].sort(
  (a, b) => Number(b.featured === true) - Number(a.featured === true),
);

export function ProjectCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState({ first: true, last: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => setPosition({
      first: track.scrollLeft <= 2,
      last: track.scrollLeft + track.clientWidth >= track.scrollWidth - 2,
    });
    update();
    track.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  function slide(direction: number) {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (!track || !card) return;
    track.scrollBy({
      left: direction * (card.getBoundingClientRect().width + 24),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <div role="region" aria-roledescription="carrousel" aria-label="Sélection de projets">
      <ul
        ref={trackRef}
        id="project-carousel"
        tabIndex={0}
        aria-label="Projets, défilement horizontal"
        className="flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto overscroll-x-contain px-1 pt-2 pb-6 [scrollbar-thin]"
      >
        {selection.map((project) => (
          <li key={project.slug} className="w-[88%] shrink-0 snap-start sm:w-[70%] lg:w-[calc(50%-0.75rem)]">
            <ProjectCard project={project} compact />
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-end gap-3">
        <button type="button" onClick={() => slide(-1)} disabled={position.first}
          aria-label="Projets précédents" aria-controls="project-carousel"
          className="grid size-11 place-items-center rounded-full border border-line bg-white text-ink transition-colors enabled:hover:border-accent enabled:hover:text-accent disabled:opacity-35">
          <ArrowLeft aria-hidden="true" className="size-5" />
        </button>
        <button type="button" onClick={() => slide(1)} disabled={position.last}
          aria-label="Projets suivants" aria-controls="project-carousel"
          className="grid size-11 place-items-center rounded-full border border-line bg-white text-ink transition-colors enabled:hover:border-accent enabled:hover:text-accent disabled:opacity-35">
          <ArrowRight aria-hidden="true" className="size-5" />
        </button>
      </div>
    </div>
  );
}
