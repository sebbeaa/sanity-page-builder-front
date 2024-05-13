import { loadHomePage, loadSettings } from "@/actions/client/loadQuery";
import { urlForOpenGraphImage } from "@/actions/client/queries";
import Footer from "@/components/global/footer";
import Header from "@/components/global/header";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";

import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const [{ data: settings }, { data: homePage }] = await Promise.all([
    loadSettings(),
    loadHomePage(),
  ]);

  const ogImage = urlForOpenGraphImage(settings?.ogImage);
  return {
    title: homePage?.seoTitle
      ? {
          template: `%s | ${homePage?.seoTitle}`,
          default: homePage?.seoTitle
            ? homePage.seoTitle
            : "Sebastian Aanstad - website builder",
        }
      : undefined,
    description: homePage?.overview
      ? toPlainText(homePage.overview)
      : "Sebastian Aanstad - website builder",
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      {children}
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
