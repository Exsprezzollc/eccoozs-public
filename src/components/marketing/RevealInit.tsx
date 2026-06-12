"use client";

import { useEffect } from "react";

export function RevealInit() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".rv"));

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("vis"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("vis");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08 }
    );

    elements.forEach((element, index) => {
      element.style.transitionDelay = `${index * 0.04}s`;
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
