"use client";

import { useEffect, useRef } from "react";

export function Page({ data }: { data: any }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = data.content.html;
      ref.current.appendChild(document.createElement("style")).innerHTML =
        data.content.css;
    }
  }, [ref, data]);
  return (
    data &&
    ref && (
      <>
        <div ref={ref} />
      </>
    )
  );
}
