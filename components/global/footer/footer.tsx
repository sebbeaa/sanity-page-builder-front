"use client";

import { useEffect, useRef } from "react";

export const FooterNav = ({ footerContent }: { footerContent: any }) => {
  const ref = useRef<any | null>(null);
  useEffect(() => {
    ref.current.innerHTML = footerContent;
  }, [footerContent]);

  return <footer ref={ref} />;
};
