import { redirect } from "next/navigation";
import Link from "next/link";

export async function NavHeader({ settings }: { settings: any }) {
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
              <Link
                onClick={() => {
                  redirect(href);
                }}
                href={href}
              >
                ${text}
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
