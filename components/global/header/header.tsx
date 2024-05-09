"use client";

import { useEffect, useRef } from "react";

export const HeaderNav = ({ headerContent }: { headerContent: any }) => {
  const ref = useRef<any | null>(null);
  useEffect(() => {
    ref.current.innerHTML = headerContent;
  }, [headerContent]);

  return <header ref={ref} />;
};
