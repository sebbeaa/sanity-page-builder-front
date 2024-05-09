export function Page({ data }: { data: any }) {
  return (
    <>
      <section dangerouslySetInnerHTML={{ __html: data.content.html }} />
      <style>{data.content.css}</style>
    </>
  );
}
