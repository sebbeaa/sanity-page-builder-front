"use client";

import { use, useEffect, useRef } from "react";

export function Page({ data }: { data: any }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = data.content.html;
      ref.current.appendChild(document.createElement("style")).innerHTML =
        data.content.css;
    }
  }, [ref, data]);
  useEffect(() => {
    if (typeof document !== "undefined") {
      const navToggle = document.getElementById("nav-toggle");
      const menuList = document.querySelector(".menu-items");
      console.log(navToggle, menuList);
      navToggle &&
        menuList &&
        navToggle.addEventListener("change", function () {
          menuList.classList.toggle("hidden");
        });
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
