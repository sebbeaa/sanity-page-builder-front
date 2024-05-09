export const FooterNav = ({ footerContent }: { footerContent: any }) => {
  return <div dangerouslySetInnerHTML={{ __html: footerContent }} />;
};
