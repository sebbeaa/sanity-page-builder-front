"use server";
export const Content = ({ Html }: { Html: any }) => {
  return <section dangerouslySetInnerHTML={{ __html: Html }} />;
};
