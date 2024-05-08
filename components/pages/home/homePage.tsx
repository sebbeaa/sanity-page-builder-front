"use client";
import { useEffect, useRef, useState } from "react";
import { loadHomePage } from "@/actions/client/client";

export function HomePage() {
  const ref = useRef<any | null>(null);

  useEffect(() => {
    loadHomePage().then((page) => {
      ref.current.innerHTML = page.content.html;
      ref.current.appendChild(document.createElement("style")).innerHTML =
        page.content.css;
    });
  }, []);

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
