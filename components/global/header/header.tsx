"use client";
import { loadSettings } from "@/actions/client/loadQuery";
import Link from "next/link";
import { useState, useEffect } from "react";

export function NavHeader() {
  const [headerContent, setHeaderContent] = useState(null);

  useEffect(() => {
    async function fetchContent() {
      const settings = await loadSettings();
      const htmlContent = settings?.data?.content?.html;
      const withoutFooter = htmlContent.split("<footer")[0];

      // Create React components from <a> tags
      const updatedContent: any = (
        <div
          dangerouslySetInnerHTML={{
            __html: withoutFooter.replace(
              /<a href="([^"]+)">([^<]+)<\/a>/g,
              (match, href, text) => {
                return `${(
                  <Link href="${href}">
                    <a>${text}</a>
                  </Link>
                )}`;
              }
            ),
          }}
        />
      );

      setHeaderContent(updatedContent);
    }

    fetchContent();
  }, []);

  return headerContent;
}
