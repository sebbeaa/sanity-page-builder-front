"use client";

import { useEffect, useRef } from "react";
export function Page({ slug, data }: { slug: string; data: any }) {
  const ref = useRef<any | null>(null);

  useEffect(() => {
    ref.current.innerHTML = data.content.html;
    ref.current.appendChild(document.createElement("style")).innerHTML =
      data.content.css;
  }, [data, slug]);

  return (
    <>
      {data ? (
        <>
          <section ref={ref} />;
        </>
      ) : (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "4rem",
          }}
        >
          🐸🐸
        </div>
      )}
    </>
  );
}
