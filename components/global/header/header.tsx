export const HeaderNav = ({ headerContent }: { headerContent: any }) => {
  return <div dangerouslySetInnerHTML={{ __html: headerContent }} />;
};
