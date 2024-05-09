"use client";
export const HeaderNav = ({ headerContent }: { headerContent: any }) => {
  return (
    headerContent && <div dangerouslySetInnerHTML={{ __html: headerContent }} />
  );
};
