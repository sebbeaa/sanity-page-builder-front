"use client";
import React, { ReactNode, createElement, useEffect, useState } from "react";
import classNames from "classnames";
import { JSDOM } from "jsdom";

const HTMLParser = ({ html }: any) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const parseHTML = (html: string): ReactNode[] => {
    // Create a DOM-like environment using jsdom
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const elements = Array.from(doc.body.childNodes);

    return elements.map(async (element: any, index: number) => {
      if (!isClient) return null;
      if (element.nodeType === Node?.TEXT_NODE) {
        return element.textContent;
      } else if (element.nodeType === Node?.ELEMENT_NODE) {
        const { tagName, attributes }: any = element as HTMLElement;
        const className = classNames(attributes.class);

        return createElement(
          tagName,
          { key: index, className },
          parseHTML(element.innerHTML)
        );
      }

      return null;
    });
  };

  return <>{parseHTML(html)}</>;
};

export default HTMLParser;
