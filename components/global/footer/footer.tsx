"use client";
export const FooterNav = ({ footerContent }: { footerContent: any }) => {
  return (
    footerContent && <div dangerouslySetInnerHTML={{ __html: footerContent }} />
  );
};
