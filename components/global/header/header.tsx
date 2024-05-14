"use server";
import Link from "next/link";

/**
 * Renders the navigation header component.
 *
 * @param settings - The settings object containing the data for the header.
 * @returns The rendered header component.
 */
export async function NavHeader({ settings }: { settings: any }) {
  const htmlContent = settings?.data?.content?.html;
  const withoutFooter = htmlContent.split("<footer")[0];

  // Create React components from <a> tags
  const updatedContent: any = (
    <div
      className=" cursor-pointer"
      dangerouslySetInnerHTML={{
        __html: withoutFooter.replace(
          /<a href="([^"]+)">([^<]+)<\/a>/g,
          (match, href, text) => {
            return `${(
              <Link rel="canonical" href={href}>
                {text}
              </Link>
            )}`;
          }
        ),
      }}
    />
  );

  return (
    <header>
      <div className="container">
        <div className="content">{updatedContent}</div>
      </div>
    </header>
  );
}
