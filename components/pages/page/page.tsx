"use client";

import { loadPageBySlug } from "@/actions/client/loadQuery";
import { useEffect, useRef, useState } from "react";
export function Page({ slug }: { slug: string }) {
  const ref = useRef<any | null>(null);

  useEffect(() => {
    loadPageBySlug(slug).then((page: any) => {
      console.log(page);
      ref.current.innerHTML = page.data.content.html;
      ref.current.appendChild(document.createElement("style")).innerHTML =
        page.data.content.css;
    });
  }, [slug]);

  return (
    <>
      {ref ? (
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
